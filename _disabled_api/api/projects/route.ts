import { NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/projects/repository";
import { createProjectSchema } from "@/lib/projects/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

function jsonError(status: number, code: string, message: string): NextResponse<ErrorResponse> {
  return NextResponse.json({ error: { code, message } }, { status });
}

function isAuthorized(request: Request): boolean {
  const configuredToken = process.env.ADMIN_TOKEN;

  if (!configuredToken) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  const headerToken = request.headers.get("x-admin-token");

  return authorization === `Bearer ${configuredToken}` || headerToken === configuredToken;
}

export async function GET() {
  const projects = await listProjects();

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return jsonError(401, "UNAUTHORIZED", "Admin token is required to create projects.");
  }

  const body: unknown = await request.json().catch(() => undefined);
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(400, "VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid project payload.");
  }

  try {
    const project = await createProject(parsed.data);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected persistence error.";

    return jsonError(500, "PROJECT_CREATE_FAILED", message);
  }
}
