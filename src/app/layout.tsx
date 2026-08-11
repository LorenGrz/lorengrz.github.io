import type { Metadata } from "next";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal"
import { IntroOverlay } from "@/components/intro-overlay";

export const metadata: Metadata = {
  title: "Lorenzo Graizzaro | Desarrollador Full Stack",
  description:
    "Portfolio de Lorenzo Graizzaro, desarrollador full-stack con proyectos en React, TypeScript, NestJS, Kotlin, Spring Boot, Docker y bases de datos SQL.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Lorenzo Graizzaro | Desarrollador Full Stack",
    description: "Portfolio de Lorenzo Graizzaro, desarrollador full-stack con proyectos en React, TypeScript, NestJS, Kotlin, Spring Boot, Docker y bases de datos SQL.",
    url: "https://d3q8bee4t9y11e.cloudfront.net",
    images: [{ url: "https://d3q8bee4t9y11e.cloudfront.net/me.jpg", width: 1080, height: 1080 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://d3q8bee4t9y11e.cloudfront.net/me.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full bg-background text-on-surface">
        <IntroOverlay />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
