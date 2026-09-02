export type ProjectStatus = "completed" | "in_progress" | "private";

export type ProjectImage = {
  readonly url: string;
  readonly alt: string;
};

export type ProjectLink = {
  readonly label: string;
  readonly url: string;
};

export type ProjectProps = {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly repositoryNote?: string;
  readonly status: ProjectStatus;
  readonly featured: boolean;
  readonly images: readonly ProjectImage[];
  readonly createdAt: string;
  readonly updatedAt: string;
};

export class Project {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly repositoryNote?: string;
  readonly status: ProjectStatus;
  readonly featured: boolean;
  readonly images: readonly ProjectImage[];
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(props: ProjectProps) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.summary = props.summary;
    this.description = props.description;
    this.stack = props.stack;
    this.githubUrl = props.githubUrl;
    this.liveUrl = props.liveUrl;
    this.repositoryNote = props.repositoryNote;
    this.status = props.status;
    this.featured = props.featured;
    this.images = props.images;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get primaryImage(): ProjectImage | undefined {
    return this.images[0];
  }

  get links(): readonly ProjectLink[] {
    return [
      this.githubUrl ? { label: "GitHub", url: this.githubUrl } : undefined,
      this.liveUrl ? { label: "Landing", url: this.liveUrl } : undefined,
    ].filter((link): link is ProjectLink => Boolean(link));
  }
}
