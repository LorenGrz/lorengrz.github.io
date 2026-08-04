import { Project } from "./project";

const now = new Date("2026-08-02T00:00:00.000Z").toISOString();

export const seedProjects = [
  new Project({
    id: "studyquest",
    title: "StudyQuest",
    slug: "studyquest",
    summary: "Plataforma de estudio full-stack con quizzes generados por IA y sistema de matching de usuarios.",
    description:
      "Plataforma en desarrollo que convierte archivos PDF/DOCX en quizzes interactivos, con una API modular en NestJS, PostgreSQL, Redis y Docker Compose.",
    stack: ["React", "TypeScript", "Tailwind", "NestJS", "PostgreSQL", "Redis", "Docker Compose"],
    githubUrl: "https://github.com/LorenGrz/StudyQuest",
    liveUrl: "https://studyquest-production-281a.up.railway.app/",
    status: "completed",
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
    summary: "Sistema de reserva y alquiler de libros con stack full-stack completamente dockerizado.",
    description:
      "Sistema de reserva y alquiler usando React, TypeScript, Chakra UI, Kotlin, Spring Boot, Docker Compose y persistencia políglota con PostgreSQL, MongoDB y Redis.",
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
    summary: "Aplicación full-stack académica estilo PedidosYa para gestión de productos, órdenes y usuarios.",
    description:
      "Proyecto académico grupal con frontends SPA, backend REST, arquitectura por capas, flujo de PRs en GitHub y Docker Compose.",
    stack: ["React", "Svelte", "TypeScript", "Tailwind", "Kotlin", "Spring Boot", "Docker Compose"],
    githubUrl: "https://github.com/LorenGrz/AlgoQuePedir",
    status: "completed",
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
  new Project({
    id: "frauddetector",
    title: "FraudDetector",
    slug: "frauddetector",
    summary: "Detección de fraude bancario con ensemble de 3 modelos ML no supervisados (~87% precisión estimada, ~110 ms respuesta) y dashboard web interactivo.",
    description:
      "API REST con FastAPI que aplica Isolation Forest, LOF y K-Means en paralelo para detectar anomalías en ~100.000 transacciones. Un cliente se reporta solo si ≥ 2 de los 3 modelos coinciden (consenso 2/3), lo que reduce falsos positivos en ~35% vs. modelo único. Tiempo de respuesta: 110–150 ms en análisis de clientes, 40–60 ms en transacciones individuales. Dashboard en HTML/JS con gráficos Plotly (scatter, boxplot) servidos como HTML desde el backend.",
    stack: ["Python", "FastAPI", "scikit-learn", "SQLite", "SQLAlchemy", "Plotly", "Bootstrap"],
    githubUrl: "https://github.com/LorenGrz/FraudDetector",
    liveUrl: "https://idljw8bb01.execute-api.us-east-1.amazonaws.com/prod/",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        alt: "Abstract data visualization representing fraud detection analytics.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  }),
  new Project({
    id: "serverlessscanner",
    title: "ServerlessScanner",
    slug: "serverlessscanner",
    summary: "Herramienta de análisis de arquitectura AWS que detecta oportunidades de migración serverless en stacks CloudFormation.",
    description:
      "API en FastAPI que analiza templates de CloudFormation e identifica recursos (EC2, RDS, ECS, etc.) que pueden migrarse a Lambda, Aurora Serverless, DynamoDB y otros servicios serverless, estimando el ahorro de costos potencial.",
    stack: ["Python", "FastAPI", "AWS Lambda", "API Gateway", "AWS SAM"],
    githubUrl: "https://github.com/LorenGrz/ServerlessScanner",
    liveUrl: "https://o5t5ellgkf.execute-api.us-east-1.amazonaws.com/prod/",
    status: "in_progress",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        alt: "Cloud infrastructure diagram representing serverless architecture analysis.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  }),
] as const;
