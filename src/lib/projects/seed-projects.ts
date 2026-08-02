import { Project } from "./project";

const now = new Date("2026-08-02T00:00:00.000Z").toISOString();

export const seedProjects = [
  new Project({
    id: "studyquest",
    title: "StudyQuest",
    slug: "studyquest",
    summary: "Full-stack study platform with AI-generated quizzes and user matching.",
    description:
      "Platform in development that converts PDF/DOCX documents into interactive quizzes, with a modular NestJS API, PostgreSQL, Redis, and Docker Compose.",
    stack: ["React", "TypeScript", "Tailwind", "NestJS", "PostgreSQL", "Redis", "Docker Compose"],
    githubUrl: "https://github.com/LorenGrz/StudyQuest",
    status: "in_progress",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        alt: "Laptop showing a learning interface for an online study platform.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  }),
  new Project({
    id: "booklibre",
    title: "BookLibre",
    slug: "booklibre",
    summary: "Book reservation and rental system with a dockerized full-stack setup.",
    description:
      "Reservation and rental system using React, TypeScript, Chakra UI, Kotlin, Spring Boot, Docker Compose, and polyglot persistence with PostgreSQL, MongoDB, and Redis.",
    stack: ["React", "TypeScript", "Chakra UI", "Kotlin", "Spring Boot", "Docker Compose"],
    githubUrl: "https://github.com/LorenGrz/BookLibre",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
        alt: "Library shelves representing a book reservation platform.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  }),
  new Project({
    id: "algo-que-pedir",
    title: "Algo Que Pedir",
    slug: "algo-que-pedir",
    summary: "Academic PedidosYa-style full-stack app for products, orders, and users.",
    description:
      "Collaborative academic project with SPA frontends, REST backend, layered architecture, GitHub PR workflow, and Docker Compose.",
    stack: ["React", "Svelte", "TypeScript", "Tailwind", "Kotlin", "Spring Boot", "Docker Compose"],
    githubUrl: "https://github.com/LorenGrz/AlgoQuePedir",
    repositoryNote: "Academic repositories may be private and available during technical interviews.",
    status: "private",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
        alt: "Food delivery order screen representing a PedidosYa-style application.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  }),
] as const;
