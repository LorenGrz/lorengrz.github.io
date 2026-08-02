import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(12).max(180),
  description: z.string().trim().min(24).max(1200),
  stack: z.array(z.string().trim().min(1).max(40)).min(1).max(16),
  githubUrl: z.string().trim().url().optional().or(z.literal("")),
  liveUrl: z.string().trim().url().optional().or(z.literal("")),
  repositoryNote: z.string().trim().max(220).optional().or(z.literal("")),
  status: z.enum(["completed", "in_progress", "private"]).default("completed"),
  featured: z.boolean().default(true),
  images: z
    .array(
      z.object({
        url: z.string().trim().url(),
        alt: z.string().trim().min(4).max(160),
      }),
    )
    .max(4)
    .default([]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export function toSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
