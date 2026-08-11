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
    liveUrl: "https://lorengrz.github.io/BookLibre/",
    repositoryNote: "Proyecto académico grupal — UNSAM.",
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
    liveUrl: "https://lorengrz.github.io/AlgoQuePedir/",
    repositoryNote: "Proyecto académico grupal — UNSAM.",
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
    liveUrl: "https://lorengrz.github.io/FraudDetector/",
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
    liveUrl: "https://lorengrz.github.io/ServerlessScanner/",
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
    id: "aws-cloud-foundations",
    title: "AWS Cloud Foundations",
    slug: "aws-cloud-foundations",
    summary: "Exploración práctica de servicios core de AWS: Lambda, EC2, RDS, Bedrock, S3, CloudFront e IAM aplicando principio de mínimo privilegio.",
    description:
      "Ejercicios hands-on que cubren el ciclo completo de los servicios fundamentales de AWS. Incluye funciones Lambda (Node.js/Python), instancias EC2, bases de datos relacionales en RDS (MySQL), inferencia de IA con Amazon Bedrock (Nova Micro), hosting estático con S3 + CloudFront, control de costos con AWS Budgets e IAM con políticas de mínimo privilegio. Infraestructura definida como código con AWS SAM y CloudFormation. Todo desplegado en us-east-1 con clean-up automático de recursos tras los ejercicios.",
    stack: ["AWS Lambda", "EC2", "RDS", "Amazon Bedrock", "S3", "CloudFront", "AWS SAM", "IAM", "AWS Budgets"],
    githubUrl: "https://github.com/LorenGrz/aws-skills",
    status: "completed",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
        alt: "Cloud server infrastructure representing hands-on AWS service exploration.",
      },
    ],
    createdAt: new Date("2026-08-04T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-08-11T00:00:00.000Z").toISOString(),
  }),
] as const;
