// scripts/download-thumbnails.mjs
//
// Bir martalik (kerak bo'lsa qayta ham ishlatsa bo'ladigan) skript:
// API'dagi barcha kurs thumbnaillarini yuklab olib, ularni
// client/public/thumbnails/ ga saqlaydi. Shundan keyin sayt rasmlarni
// VPS (api.sevenedu.org) o'rniga o'z domenidan (statik) beradi.
//
// Ishlatish:  node scripts/download-thumbnails.mjs
//
// Fayl nomi API URL'idagi oxirgi segment bilan bir xil saqlanadi, shuning
// uchun kod tomonida URL -> /thumbnails/<fayl> ga aylantirish oson bo'ladi.

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "thumbnails");
const API = "https://api.sevenedu.org";
const COURSES_URL = `${API}/courses/all`;

// Flaky VPS uchun bir necha marta urinib ko'radigan fetch.
async function fetchWithRetry(url, opts = {}, tries = 5) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { ...opts, signal: AbortSignal.timeout(20000) });
      if (res.ok) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
  }
  throw lastErr;
}

// URL'dan xavfsiz fayl nomini olamiz (oxirgi segment).
function fileNameFromUrl(url) {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname.split("/").filter(Boolean).pop() || "");
  } catch {
    return "";
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log("Kurslar ro'yxati olinyapti:", COURSES_URL);
  const res = await fetchWithRetry(COURSES_URL);
  const courses = await res.json();

  // Unique thumbnail URL'lar (faqat api.sevenedu.org/uploads/... bo'lganlari).
  const urls = [
    ...new Set(
      courses
        .map((c) => c?.thumbnail)
        .filter((t) => typeof t === "string" && t.includes("/uploads/courses/"))
    ),
  ];

  console.log(`Jami kurs: ${courses.length} | yuklab olinadigan thumbnail: ${urls.length}\n`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const url of urls) {
    const name = fileNameFromUrl(url);
    if (!name) {
      console.warn("  ! fayl nomi aniqlanmadi:", url);
      failed++;
      continue;
    }
    const dest = path.join(OUT_DIR, name);
    if (existsSync(dest)) {
      console.log("  = mavjud, o'tkazib yuborildi:", name);
      skipped++;
      continue;
    }
    try {
      const imgRes = await fetchWithRetry(url);
      const buf = Buffer.from(await imgRes.arrayBuffer());
      if (buf.length < 100) throw new Error(`juda kichik (${buf.length} bayt)`);
      await writeFile(dest, buf);
      console.log(`  ✓ ${name}  (${(buf.length / 1024).toFixed(1)} KB)`);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${name}  — ${e.message}`);
      failed++;
    }
  }

  // Manifest: localda mavjud thumbnail fayl nomlari. Kod faqat shu ro'yxatdagi
  // rasmlarni localdan beradi; qolganlari (yangi qo'shilgan, hali yuklab
  // olinmagan) avtomatik eski API URL'iga fallback bo'ladi.
  const { readdir } = await import("node:fs/promises");
  const files = (await readdir(OUT_DIR)).filter(
    (f) => !f.startsWith(".") && f !== "placeholder.png"
  );
  const manifestPath = path.join(__dirname, "..", "app", "data", "thumbnails.json");
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(files.sort(), null, 2) + "\n");
  console.log(`Manifest yozildi: app/data/thumbnails.json (${files.length} fayl)`);

  console.log(`\nTayyor. Yangi: ${ok}, mavjud: ${skipped}, xato: ${failed}.`);
  console.log(`Saqlandi: ${path.relative(path.join(__dirname, ".."), OUT_DIR)}/`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("Skript xatosi:", e);
  process.exit(1);
});
