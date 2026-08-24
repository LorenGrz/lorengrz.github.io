import { Project } from "./project";

export const seedProjects = [
  new Project({
    id: "prioria",
    title: "Prioria",
    slug: "prioria",
    summary: "App Android que intercepta notificaciones, las prioriza con un agente de IA y las muestra en un widget. TTS automático vía Amazon Polly.",
    description:
      "MVP Android-first construido con Expo (SDK 57) y React Native. Un agente serverless (Strands Agents SDK + Bedrock) analiza cada notificación según las preferencias y reglas del usuario y le asigna un score de prioridad. Las críticas se envían al widget vía FCM y se leen por voz con Amazon Polly (voces Lucía/Enrique). El usuario refuerza el modelo con feedback explícito (👍/👎), apertura desde el widget y conversación directa con el agente en la pantalla Entrenar. Backend 100% serverless AWS: SAM, Lambda (Node 24 + Python 3.13), API Gateway, Cognito, DynamoDB, SQS.",
    stack: [
      "React Native",
      "Expo",
      "NativeWind",
      "TypeScript",
      "AWS Lambda",
      "API Gateway",
      "Amazon Cognito",
      "DynamoDB",
      "Amazon Polly",
      "Strands Agents",
      "Amazon Bedrock",
      "AWS SAM",
      "Next.js",
    ],
    githubUrl: "https://github.com/LorenGrz/Prioria",
    liveUrl: "https://lorengrz.github.io/landing-prioria/",
    status: "in_progress",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
        alt: "Smartphone screen with notification bubbles representing an AI-powered notification prioritization app.",
      },
    ],
    createdAt: new Date("2026-08-04T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-08-04T00:00:00.000Z").toISOString(),
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
    liveUrl: "https://lorengrz.github.io/landing-serverlessscanner/",
    status: "in_progress",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        alt: "Cloud infrastructure diagram representing serverless architecture analysis.",
      },
    ],
    createdAt: new Date("2026-07-10T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-07-10T00:00:00.000Z").toISOString(),
  }),
  new Project({
    id: "studyquest",
    title: "StudyQuest",
    slug: "studyquest",
    summary: "Plataforma de estudio full-stack con quizzes generados por IA y sistema de matching de usuarios.",
    description:
      "Plataforma en desarrollo que convierte archivos PDF/DOCX en quizzes interactivos, con una API modular en NestJS, PostgreSQL, Redis y Docker Compose.",
    stack: ["React", "TypeScript", "Tailwind", "NestJS", "PostgreSQL", "Redis", "Docker Compose"],
    githubUrl: "https://github.com/LorenGrz/StudyQuest",
    liveUrl: "https://lorengrz.github.io/landing-studyquest/",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        alt: "Laptop showing a learning interface for an online study platform.",
      },
    ],
    createdAt: new Date("2026-06-01T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-06-01T00:00:00.000Z").toISOString(),
  }),
  new Project({
    id: "frauddetector",
    title: "FraudDetector",
    slug: "frauddetector",
    summary: "Herramienta de detección de fraude bancario que analiza 100k+ transacciones usando consenso de 3 modelos ML y visualiza el riesgo en un dashboard interactivo.",
    description:
      "Procesa datasets de 100k+ transacciones bancarias para identificar clientes y operaciones sospechosas. Tres modelos de ML no supervisado (Isolation Forest, LOF, K-Means) analizan cada caso en paralelo: un cliente se marca como riesgo solo cuando ≥ 2 modelos coinciden, lo que reduce falsos positivos un ~35% frente a un modelo único. El dashboard interactivo (Plotly) muestra la distribución de riesgo por cliente, compara perfiles y permite inspeccionar transacciones individuales con scatter plots y boxplots. API REST con tiempos de respuesta de 110–150 ms por análisis de cliente y 40–60 ms por transacción.",
    stack: ["Python", "FastAPI", "scikit-learn", "SQLite", "SQLAlchemy", "Plotly", "Bootstrap"],
    githubUrl: "https://github.com/LorenGrz/FraudDetector",
    liveUrl: "https://lorengrz.github.io/landing-frauddetector/",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        alt: "Abstract data visualization representing fraud detection analytics.",
      },
    ],
    createdAt: new Date("2026-04-15T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-04-15T00:00:00.000Z").toISOString(),
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
    liveUrl: "https://lorengrz.github.io/landing-booklibre/",
    repositoryNote: "Proyecto académico grupal — UNSAM.",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
        alt: "Library shelves representing a book reservation platform.",
      },
    ],
    createdAt: new Date("2026-02-01T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-02-01T00:00:00.000Z").toISOString(),
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
    repositoryNote: "Proyecto académico grupal — UNSAM.",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
        alt: "Food delivery order screen representing a PedidosYa-style application.",
      },
    ],
    createdAt: new Date("2025-11-01T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2025-11-01T00:00:00.000Z").toISOString(),
  }),
] as const;
