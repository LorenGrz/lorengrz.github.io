#!/usr/bin/env node
/**
 * Generates an ATS-friendly CV PDF from a JSON Resume file.
 *
 * Layout rules (parse-safe for Workday, Greenhouse, Lever, etc.):
 * - Single column, no tables, no text boxes, no header/footer content.
 * - Skills as "Category: a, b, c" lines, never columns.
 * - Work entries stacked as Title / Company / Dates, each on its own line.
 * - Dates always "Mon YYYY – Mon YYYY" (or "Present"), never year-only ranges.
 * - Bullets are real "•" text, so they survive plain-text extraction.
 *
 * Usage:
 *   node scripts/generate-cv.mjs <input.json> <output.pdf>
 *
 * Requires: puppeteer-core, system Chromium at /usr/bin/chromium
 */

import puppeteer from "puppeteer-core";
import { readFileSync } from "fs";
import { resolve } from "path";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node generate-cv.mjs <input.json> <output.pdf>");
  process.exit(1);
}

const resume = JSON.parse(readFileSync(resolve(inputPath), "utf-8"));

const isEnglish = resume.meta?.canonical?.includes(".en.json");
const lang = isEnglish ? "en" : "es";

const labels = isEnglish
  ? {
      summary: "Professional Summary",
      skills: "Skills",
      projects: "Projects",
      work: "Work Experience",
      education: "Education",
      additional: "Additional Information",
      languages: "Languages",
      present: "Present",
      inProgress: "In progress",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
  : {
      summary: "Perfil profesional",
      skills: "Habilidades",
      projects: "Proyectos",
      work: "Experiencia laboral",
      education: "Educación",
      additional: "Información adicional",
      languages: "Idiomas",
      present: "Presente",
      inProgress: "En curso",
      months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    };

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const stripProtocol = (url) => url.replace(/^https?:\/\//, "");

function formatDate(dateStr) {
  if (!dateStr) return labels.present;
  const [year, month] = dateStr.split("-");
  return month ? `${labels.months[Number(month) - 1]} ${year}` : year;
}

const formatDateRange = (start, end) => `${formatDate(start)} – ${formatDate(end)}`;

const bulletList = (items) =>
  items?.length
    ? `<ul>${items.map((item) => `<li><span class="dot">•</span><span>${escapeHtml(item)}</span></li>`).join("")}</ul>`
    : "";

const section = (title, body) => (body ? `<section><h2>${title}</h2>${body}</section>` : "");

function renderSkills(skills) {
  return (skills || [])
    .map((s) => `<p class="skill-line"><strong>${escapeHtml(s.name)}:</strong> ${escapeHtml(s.keywords.join(", "))}</p>`)
    .join("");
}

function renderProjects(projects) {
  return (projects || [])
    .map(
      (p) => `
      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">${escapeHtml(p.name)}</span>
          ${p.url ? `<span class="entry-meta">${escapeHtml(stripProtocol(p.url))}</span>` : ""}
        </div>
        ${p.keywords?.length ? `<p class="entry-stack">Stack: ${escapeHtml(p.keywords.join(", "))}</p>` : ""}
        ${bulletList(p.highlights)}
      </div>`,
    )
    .join("");
}

function renderWork(work) {
  return (work || [])
    .map(
      (w) => `
      <div class="entry">
        <p class="entry-title">${escapeHtml(w.position)}</p>
        <p class="entry-line">${escapeHtml(w.name)}</p>
        <p class="entry-line entry-muted">${formatDateRange(w.startDate, w.endDate)}</p>
        ${bulletList(w.highlights)}
      </div>`,
    )
    .join("");
}

function renderEducation(education) {
  return (education || [])
    .map(
      (e) => `
      <div class="entry">
        <p class="entry-title">${escapeHtml(e.studyType)}</p>
        <p class="entry-line">${escapeHtml(e.institution)}</p>
        <p class="entry-line entry-muted">${e.endDate ? formatDate(e.endDate) : labels.inProgress}</p>
      </div>`,
    )
    .join("");
}

function renderAdditional(resume) {
  const langs = (resume.languages || []).map((l) => `${l.language} (${l.fluency})`).join(", ");
  const extra = resume.meta?.extra || {};
  const lines = [
    langs ? `<strong>${labels.languages}:</strong> ${escapeHtml(langs)}` : null,
    extra.availability ? escapeHtml(extra.availability) : null,
    extra.transport ? escapeHtml(extra.transport) : null,
  ].filter(Boolean);
  return `<p class="skill-line">${lines.join(" | ")}</p>`;
}

const b = resume.basics;
const profileUrl = (network) => b.profiles?.find((p) => p.network === network)?.url;
const contactParts = [
  b.location ? `${b.location.city}, ${b.location.region === b.location.city ? "Argentina" : b.location.region}` : null,
  b.phone,
  b.email,
  profileUrl("LinkedIn") && stripProtocol(profileUrl("LinkedIn")),
  profileUrl("GitHub") && stripProtocol(profileUrl("GitHub")),
  profileUrl("Portfolio") && stripProtocol(profileUrl("Portfolio")),
].filter(Boolean);

const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(b.name)} - CV</title>
<meta name="author" content="${escapeHtml(b.name)}">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9.5pt;
    color: #111;
    background: white;
    line-height: 1.3;
  }

  .cv-name {
    font-size: 17pt;
    font-weight: bold;
    text-align: center;
  }

  .cv-label {
    font-size: 11pt;
    text-align: center;
    margin-top: 1pt;
  }

  .cv-contact {
    font-size: 9pt;
    text-align: center;
    color: #333;
    margin-top: 3pt;
    margin-bottom: 8pt;
  }

  section { margin-bottom: 7pt; }

  h2 {
    font-size: 10pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1pt solid #111;
    padding-bottom: 1.5pt;
    margin-bottom: 4pt;
    break-after: avoid;
  }

  .summary-text { text-align: justify; }

  .skill-line { margin-bottom: 1.5pt; }

  .entry {
    margin-bottom: 5pt;
    break-inside: avoid;
  }

  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8pt;
  }

  .entry-title { font-weight: bold; }

  .entry-meta, .entry-muted { color: #444; font-size: 9pt; }

  .entry-stack {
    color: #444;
    font-size: 9pt;
    margin-top: 1pt;
  }

  ul { list-style: none; margin-top: 2pt; }

  li {
    display: flex;
    gap: 5pt;
    margin-bottom: 1.5pt;
  }

  .dot { flex: none; }

  @page {
    size: A4;
    margin: 13mm 15mm 12mm 15mm;
  }
</style>
</head>
<body>

<p class="cv-name">${escapeHtml(b.name)}</p>
${b.label ? `<p class="cv-label">${escapeHtml(b.label)}</p>` : ""}
<p class="cv-contact">${contactParts.map(escapeHtml).join(" | ")}</p>

${section(labels.summary, `<p class="summary-text">${escapeHtml(b.summary)}</p>`)}
${section(labels.skills, renderSkills(resume.skills))}
${section(labels.projects, renderProjects(resume.projects))}
${section(labels.work, renderWork(resume.work))}
${section(labels.education, renderEducation(resume.education))}
${section(labels.additional, renderAdditional(resume))}

</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });

await page.pdf({
  path: resolve(outputPath),
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  tagged: true,
});

await browser.close();
console.log(`Generated: ${outputPath}`);
