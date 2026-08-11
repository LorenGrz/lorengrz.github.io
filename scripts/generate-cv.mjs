#!/usr/bin/env node
/**
 * Generates a CV PDF from a JSON Resume file.
 * Replicates the exact visual format of the existing Lorenzo Graizzaro CV PDFs.
 *
 * Usage:
 *   node scripts/generate-cv.mjs <input.json> <output.pdf>
 *
 * Examples:
 *   node scripts/generate-cv.mjs public/resume.json public/Lorenzo_Graizzaro_CV_ES.pdf
 *   node scripts/generate-cv.mjs public/resume.en.json public/Lorenzo_Graizzaro_CV_EN.pdf
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

function formatDate(dateStr, isEnglish = false) {
  if (!dateStr) return isEnglish ? "Present" : "Presente";
  const [year, month] = dateStr.split("-");
  if (!month) return year;
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return `${months[month]} ${year}`;
}

function formatDateRange(start, end, isEnglish = false) {
  const presentLabel = isEnglish ? "Present" : "Presente";
  const s = formatDate(start, isEnglish);
  const e = end ? formatDate(end, isEnglish) : null;
  if (!e) return `${s} – ${presentLabel}`;
  if (s.split(" ")[1] === e.split(" ")[1] && !start.includes("-"))
    return e.split(" ")[1];
  return `${s} – ${e}`;
}

function skillsGrid(skills) {
  const groupSize = 3;
  const chunks = [];
  for (let i = 0; i < skills.length; i += groupSize) {
    chunks.push(skills.slice(i, i + groupSize));
  }

  const rows = [];
  const maxRows = Math.max(...chunks.map((c) => c.length));
  for (let r = 0; r < maxRows; r++) {
    const cells = chunks.map((chunk) => {
      const item = chunk[r];
      if (!item) return "<td></td>";
      return `<td><span class="bullet">▪</span> ${item.keywords.join(" · ")}</td>`;
    });
    rows.push(`<tr>${cells.join("")}</tr>`);
  }
  return `<table class="skills-table"><tbody>${rows.join("")}</tbody></table>`;
}

function projectYear(createdAt) {
  if (!createdAt) return "";
  return new Date(createdAt).getFullYear().toString();
}

function renderProjects(projects, label, isEnglish = false) {
  if (!projects || projects.length === 0) return "";
  const items = projects
    .map((p) => {
      // Projects: show only the year if no endDate, or a range if endDate is set
      const year = p.startDate
        ? p.endDate
          ? formatDateRange(p.startDate, p.endDate, isEnglish)
          : p.startDate.split("-")[0]
        : projectYear(p.createdAt) || "";
      const stack = (p.keywords || []).join(" · ");
      const bullets = (p.highlights || [])
        .map((h) => `<li>${h}</li>`)
        .join("");
      const role = p.roles?.[0] || "";
      const nameRole = role ? `${p.name} — ${role}` : p.name;
      return `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${nameRole}</span>
          <span class="entry-date">${year}</span>
        </div>
        ${stack ? `<div class="entry-stack">${stack}</div>` : ""}
        ${bullets ? `<ul>${bullets}</ul>` : ""}
      </div>`;
    })
    .join("");
  return `<section><h2>${label}</h2>${items}</section>`;
}

function renderWork(work, label, isEnglish = false) {
  if (!work || work.length === 0) return "";
  const items = work
    .map((w) => {
      const dates = formatDateRange(w.startDate, w.endDate, isEnglish);
      const bullets = (w.highlights || [])
        .map((h) => `<li>${h}</li>`)
        .join("");
      return `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${w.name} — ${w.position}</span>
          <span class="entry-date">${dates}</span>
        </div>
        ${w.location ? `<div class="entry-sub">${w.location}</div>` : ""}
        ${bullets ? `<ul>${bullets}</ul>` : ""}
      </div>`;
    })
    .join("");
  return `<section><h2>${label}</h2>${items}</section>`;
}

function renderEducation(education, label, isEnglish = false) {
  if (!education || education.length === 0) return "";
  const items = education
    .map((e) => {
      const date = formatDate(e.endDate, isEnglish);
      return `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${e.studyType} — ${e.area}</span>
          <span class="entry-date">${date}</span>
        </div>
        <div class="entry-sub">${e.institution}${e.location ? ` · ${e.location}` : ""}</div>
      </div>`;
    })
    .join("");
  return `<section><h2>${label}</h2>${items}</section>`;
}

function renderAdditional(resume, labels) {
  const langs = (resume.languages || [])
    .map((l) => `<span class="bullet">▪</span> ${l.language} — ${l.fluency}`)
    .join("&emsp;");

  const extra = resume.meta?.extra || {};
  const extraItems = [extra.transport, extra.availability]
    .filter(Boolean)
    .map((v) => `<span class="bullet">▪</span> ${v}`)
    .join("&emsp;");

  const combined = [langs, extraItems].filter(Boolean).join("&emsp;&emsp;");

  return `<section><h2>${labels.additional}</h2><p class="additional-line">${combined}</p></section>`;
}

// Detect language from meta canonical URL
const isEnglish = resume.meta?.canonical?.includes(".en.json");
const lang = isEnglish ? "en" : "es";

const labels =
  lang === "es"
    ? {
        summary: "PERFIL PROFESIONAL",
        skills: "HABILIDADES TÉCNICAS",
        projects: "PROYECTOS PERSONALES",
        work: "EXPERIENCIA LABORAL",
        education: "EDUCACIÓN",
        additional: "INFORMACIÓN ADICIONAL",
      }
    : {
        summary: "PROFESSIONAL SUMMARY",
        skills: "TECHNICAL SKILLS",
        projects: "PERSONAL PROJECTS",
        work: "WORK EXPERIENCE",
        education: "EDUCATION",
        additional: "ADDITIONAL INFORMATION",
      };

const b = resume.basics;
const contactParts = [
  b.email,
  b.phone?.replace("+54 ", ""),
  b.location ? `${b.location.city}, ${b.location.countryCode}` : null,
  b.profiles?.find((p) => p.network === "GitHub")?.url?.replace("https://", ""),
  b.profiles
    ?.find((p) => p.network === "LinkedIn")
    ?.url?.replace("https://", ""),
].filter(Boolean);

const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
    color: #111;
    background: white;
    padding: 18mm 18mm 16mm 18mm;
    line-height: 1.35;
  }

  /* Header */
  .cv-name {
    text-align: center;
    font-size: 18pt;
    font-weight: bold;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }

  .cv-contact {
    text-align: center;
    font-size: 9pt;
    color: #333;
    margin-bottom: 14pt;
  }

  /* Sections */
  section {
    margin-bottom: 11pt;
  }

  h2 {
    font-size: 9.5pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1.2pt solid #111;
    padding-bottom: 2pt;
    margin-bottom: 6pt;
  }

  /* Skills grid */
  .skills-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
  }

  .skills-table td {
    width: 33.33%;
    padding: 1.5pt 4pt 1.5pt 0;
    vertical-align: top;
  }

  /* Entries (projects, work, education) */
  .entry {
    margin-bottom: 7pt;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .entry-title {
    font-weight: bold;
    font-size: 9.5pt;
  }

  .entry-date {
    font-size: 9pt;
    color: #444;
    white-space: nowrap;
    margin-left: 8pt;
  }

  .entry-stack {
    font-size: 9pt;
    color: #444;
    margin-top: 1pt;
    margin-bottom: 2pt;
  }

  .entry-sub {
    font-size: 9pt;
    color: #555;
    margin-top: 1pt;
  }

  ul {
    margin-top: 3pt;
    padding-left: 12pt;
    list-style: none;
  }

  ul li {
    font-size: 9.5pt;
    margin-bottom: 2pt;
    position: relative;
  }

  ul li::before {
    content: "▪";
    position: absolute;
    left: -10pt;
    color: #111;
    font-size: 8pt;
    top: 0.5pt;
  }

  /* Summary */
  .summary-text {
    font-size: 9.5pt;
    text-align: justify;
  }

  /* Additional */
  .additional-line {
    font-size: 9.5pt;
  }

  .bullet {
    font-size: 8pt;
  }

  @page {
    size: A4;
    margin: 0;
  }
</style>
</head>
<body>

<div class="cv-name">${b.name}</div>
<div class="cv-contact">${contactParts.join(" · ")}</div>

<section>
  <h2>${labels.summary}</h2>
  <p class="summary-text">${b.summary}</p>
</section>

<section>
  <h2>${labels.skills}</h2>
  ${skillsGrid(resume.skills || [])}
</section>

${renderProjects(resume.projects, labels.projects, isEnglish)}
${renderWork(resume.work, labels.work, isEnglish)}
${renderEducation(resume.education, labels.education, isEnglish)}
${renderAdditional(resume, labels)}

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
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log(`Generated: ${outputPath}`);
