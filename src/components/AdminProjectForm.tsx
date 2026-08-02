"use client";

import { useState, type FormEvent } from "react";

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function splitCsv(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminProjectForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "idle", message: "" });

    const form = event.currentTarget;
    const data = new FormData(form);
    const token = String(data.get("token") ?? "");
    const imageUrl = String(data.get("imageUrl") ?? "").trim();
    const imageAlt = String(data.get("imageAlt") ?? "").trim();

    const payload = {
      title: String(data.get("title") ?? ""),
      summary: String(data.get("summary") ?? ""),
      description: String(data.get("description") ?? ""),
      stack: splitCsv(String(data.get("stack") ?? "")),
      githubUrl: String(data.get("githubUrl") ?? ""),
      liveUrl: String(data.get("liveUrl") ?? ""),
      repositoryNote: String(data.get("repositoryNote") ?? ""),
      status: String(data.get("status") ?? "completed"),
      featured: data.get("featured") === "on",
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt || "Project screenshot" }] : [],
    };

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      setState({
        status: "error",
        message: result?.error?.message ?? "Could not create the project.",
      });
      return;
    }

    form.reset();
    setState({ status: "success", message: "Project saved. Refresh the page to see it in the public list." });
  }

  return (
    <section className="border-t border-outline-variant bg-surface-container-low py-section">
      <div className="mx-auto max-w-container px-page">
        <button
          className="inline-flex items-center rounded-md border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:text-primary"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          Soy Lorenzo
        </button>

        {isOpen ? (
          <form className="mt-6 grid gap-4 rounded-lg border border-outline-variant bg-white p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Admin token
                <input className="rounded-md border border-outline-variant px-3 py-2" name="token" type="password" required />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Project title
                <input className="rounded-md border border-outline-variant px-3 py-2" name="title" required />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Summary
              <input className="rounded-md border border-outline-variant px-3 py-2" name="summary" required />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Description
              <textarea className="min-h-28 rounded-md border border-outline-variant px-3 py-2" name="description" required />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Stack, separated by commas
              <input className="rounded-md border border-outline-variant px-3 py-2" name="stack" placeholder="React, TypeScript, NestJS" required />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                GitHub URL
                <input className="rounded-md border border-outline-variant px-3 py-2" name="githubUrl" type="url" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Live URL
                <input className="rounded-md border border-outline-variant px-3 py-2" name="liveUrl" type="url" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Image URL
                <input className="rounded-md border border-outline-variant px-3 py-2" name="imageUrl" type="url" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Image alt text
                <input className="rounded-md border border-outline-variant px-3 py-2" name="imageAlt" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <label className="grid gap-2 text-sm font-medium">
                Repository note
                <input className="rounded-md border border-outline-variant px-3 py-2" name="repositoryNote" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Status
                <select className="rounded-md border border-outline-variant px-3 py-2" name="status">
                  <option value="completed">Completed</option>
                  <option value="in_progress">In progress</option>
                  <option value="private">Private</option>
                </select>
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium">
              <input name="featured" type="checkbox" defaultChecked />
              Featured project
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark" type="submit">
                Save project
              </button>
              {state.message ? (
                <p className={state.status === "error" ? "text-sm text-red-700" : "text-sm text-secondary"}>
                  {state.message}
                </p>
              ) : null}
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}
