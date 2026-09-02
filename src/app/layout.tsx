import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal"
import { IntroOverlay } from "@/components/intro-overlay";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://lorengrz.github.io";

// Only the Material Symbols glyphs actually rendered on the page.
const MATERIAL_SYMBOLS = [
  "terminal",
  "dns",
  "storage",
  "settings",
  "query_stats",
  "auto_stories",
  "alternate_email",
  "code",
  "person",
  "chat",
  "close",
  "description",
  "open_in_new",
  "menu",
].join(",");

const description =
  "Portfolio de Lorenzo Graizzaro, Software Developer con proyectos en React, TypeScript, NestJS, Kotlin, Spring Boot, Docker y bases de datos SQL.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lorenzo Graizzaro | Software Developer",
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Lorenzo Graizzaro | Software Developer",
    description,
    url: "/",
    siteName: "Lorenzo Graizzaro",
    locale: "es_AR",
    images: [{ url: "/me.jpg", width: 1080, height: 1080, alt: "Lorenzo Graizzaro" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenzo Graizzaro | Software Developer",
    description,
    images: ["/me.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lorenzo Graizzaro",
  jobTitle: "Software Developer",
  url: SITE_URL,
  image: `${SITE_URL}/me.jpg`,
  email: "mailto:lorenzograizzaro55@gmail.com",
  sameAs: [
    "https://github.com/LorenGrz",
    "https://linkedin.com/in/lorenzo-graizzaro",
    "https://leetcode.com/u/LorenGrz/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "NestJS",
    "Node.js",
    "Kotlin",
    "Spring Boot",
    "PostgreSQL",
    "Docker",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`h-full scroll-smooth antialiased ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Progressive enhancement flag: scroll-reveal only hides content when JS is available. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        { }
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${MATERIAL_SYMBOLS}&display=swap`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
