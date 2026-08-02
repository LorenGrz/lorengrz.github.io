import pg from "pg";
import { Project, type ProjectImage, type ProjectProps, type ProjectStatus } from "./project";
import { seedProjects } from "./seed-projects";
import type { CreateProjectInput } from "./validation";
import { toSlug } from "./validation";

const { Pool } = pg;

type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  stack: string[];
  github_url: string | null;
  live_url: string | null;
  repository_note: string | null;
  status: ProjectStatus;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
  images: ProjectImage[] | null;
};

declare global {
  var portfolioProjectPool: pg.Pool | undefined;
}

function getPool(): pg.Pool | undefined {
  if (!process.env.DATABASE_URL) {
    return undefined;
  }

  globalThis.portfolioProjectPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DATABASE_POOL_MAX ?? 2),
    ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
  });

  return globalThis.portfolioProjectPool;
}

function mapRecord(record: ProjectRecord): Project {
  const props: ProjectProps = {
    id: record.id,
    title: record.title,
    slug: record.slug,
    summary: record.summary,
    description: record.description,
    stack: record.stack,
    githubUrl: record.github_url ?? undefined,
    liveUrl: record.live_url ?? undefined,
    repositoryNote: record.repository_note ?? undefined,
    status: record.status,
    featured: record.featured,
    images: record.images ?? [],
    createdAt: record.created_at.toISOString(),
    updatedAt: record.updated_at.toISOString(),
  };

  return new Project(props);
}

export async function initializeProjectSchema(): Promise<void> {
  const pool = getPool();

  if (!pool) {
    return;
  }

  await pool.query(`
    create extension if not exists pgcrypto;

    create table if not exists projects (
      id uuid primary key default gen_random_uuid(),
      title text not null,
      slug text not null unique,
      summary text not null,
      description text not null,
      stack text[] not null default '{}',
      github_url text,
      live_url text,
      repository_note text,
      status text not null check (status in ('completed', 'in_progress', 'private')),
      featured boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );

    create table if not exists project_images (
      id uuid primary key default gen_random_uuid(),
      project_id uuid not null references projects(id) on delete cascade,
      url text not null,
      alt text not null,
      sort_order integer not null default 0
    );
  `);
}

export async function listProjects(): Promise<readonly Project[]> {
  const pool = getPool();

  if (!pool) {
    return seedProjects;
  }

  await initializeProjectSchema();

  const { rows } = await pool.query<ProjectRecord>(`
    select
      p.*,
      coalesce(
        json_agg(
          json_build_object('url', pi.url, 'alt', pi.alt)
          order by pi.sort_order asc
        ) filter (where pi.id is not null),
        '[]'::json
      ) as images
    from projects p
    left join project_images pi on pi.project_id = p.id
    group by p.id
    order by p.featured desc, p.created_at desc;
  `);

  return rows.map(mapRecord);
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const pool = getPool();

  if (!pool) {
    throw new Error("DATABASE_URL is required to create projects.");
  }

  await initializeProjectSchema();

  const client = await pool.connect();
  const slug = toSlug(input.title);

  try {
    await client.query("begin");

    const { rows } = await client.query<ProjectRecord>(
      `
        insert into projects (
          title,
          slug,
          summary,
          description,
          stack,
          github_url,
          live_url,
          repository_note,
          status,
          featured
        )
        values ($1, $2, $3, $4, $5, nullif($6, ''), nullif($7, ''), nullif($8, ''), $9, $10)
        returning *, '[]'::json as images;
      `,
      [
        input.title,
        slug,
        input.summary,
        input.description,
        input.stack,
        input.githubUrl ?? "",
        input.liveUrl ?? "",
        input.repositoryNote ?? "",
        input.status,
        input.featured,
      ],
    );

    const project = rows[0];

    for (const [index, image] of input.images.entries()) {
      await client.query(
        `
          insert into project_images (project_id, url, alt, sort_order)
          values ($1, $2, $3, $4);
        `,
        [project.id, image.url, image.alt, index],
      );
    }

    await client.query("commit");

    return (await listProjects()).find((item) => item.id === project.id) ?? mapRecord(project);
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
