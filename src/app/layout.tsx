import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lorenzo Graizzaro | Full Stack Developer",
  description:
    "Portfolio of Lorenzo Graizzaro, a full-stack developer building projects with React, TypeScript, NestJS, Kotlin, Spring Boot, Docker, and SQL databases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background text-on-surface">{children}</body>
    </html>
  );
}
