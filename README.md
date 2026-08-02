# Lorenzo Graizzaro Portfolio

Personal full-stack portfolio built with Next.js, TypeScript, Tailwind CSS, Node.js route handlers, and PostgreSQL.

The public page presents Lorenzo's profile, skills, work experience, and featured projects. The private `Soy Lorenzo` form lets Lorenzo add a new project without editing source code.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- PostgreSQL through `pg`
- Zod for API request validation
- AWS SAM deployment draft for a serverless Node.js runtime

## Local Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Without `DATABASE_URL`, the app renders seeded projects from `src/lib/projects/seed-projects.ts`. Creating projects requires a PostgreSQL database and `ADMIN_TOKEN`.

## Database

Run the schema in `database/schema.sql` against PostgreSQL:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

Project data is stored in relational tables:

- `projects`: title, slug, summary, description, stack, GitHub/live links, status, featured flag.
- `project_images`: image URL, alt text, and order for each project.

Images are stored as URLs instead of binary blobs. For AWS production, the next step is S3 uploads with presigned URLs while keeping the relational database as the source of truth.

## Admin Flow

1. Set `ADMIN_TOKEN` in the server environment.
2. Open the homepage.
3. Click `Soy Lorenzo`.
4. Enter the token and project details.
5. Submit the form.

The API validates the request and writes to PostgreSQL through `POST /api/projects`.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## AWS Serverless Notes

The project includes `aws/template.yaml`, modeled after the `ServerlessScanner` SAM approach, but Next.js requires a build adapter before SAM can package the Lambda.

Recommended path:

1. Use OpenNext to generate `.open-next/server-functions/default/`.
2. Point `aws/template.yaml` at that generated handler.
3. Provide `DatabaseUrl` and `AdminToken` during `sam deploy`.
4. Use Amazon RDS PostgreSQL or Aurora PostgreSQL for the relational database.

The current SAM file is a deployment starting point, not a fully verified production deploy artifact yet.

## Project Notes

- Server components are the default.
- The project repository is designed around real CV context from Lorenzo Graizzaro.
- Public academic repositories may be private by university policy and can be labeled accordingly in project cards.
