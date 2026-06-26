// app/lib/thumbnail.ts
//
// Kurs thumbnail manzilini xavfsiz holatga keltiruvchi yagona joy.
// Maqsad: rasmlarni VPS (api.sevenedu.org) o'rniga saytning o'z domenidan
// (statik /thumbnails/<fayl>) berish — shunda sekin VPS sahifa yuklanishiga
// to'sqinlik qilmaydi.
//
// Mantiq:
//  1. Bo'sh URL -> placeholder.
//  2. URL ichidagi fayl nomi localda (public/thumbnails/) mavjud bo'lsa ->
//     /thumbnails/<fayl> qaytariladi (statik, tez, CDN orqali).
//  3. Aks holda to'liq http(s) URL bo'lsa -> xom holda qaytariladi
//     (yangi qo'shilgan, hali yuklab olinmagan rasmlar uchun fallback).
//  4. Eski nisbiy /images/<fayl> yo'llari -> legacy S3.
//  5. Hech biri mos kelmasa -> placeholder.
//
// Yangi kurs qo'shilganda:  node scripts/download-thumbnails.mjs  ishlatib,
// public/thumbnails/ va app/data/thumbnails.json ni yangilang, keyin deploy.

import thumbnailManifest from "@/app/data/thumbnails.json";

export const PLACEHOLDER_THUMBNAIL = "/thumbnails/placeholder.png";

// Tez qidiruv uchun Set.
const localThumbnails = new Set<string>(thumbnailManifest as string[]);

function fileNameFromUrl(url: string): string {
  // Oxirgi segment (so'rov parametrlarisiz).
  const clean = url.split("?")[0].split("#")[0];
  return decodeURIComponent(clean.split("/").filter(Boolean).pop() || "");
}

export function getSafeThumbnail(originalUrl?: string | null): string {
  if (!originalUrl) return PLACEHOLDER_THUMBNAIL;

  // 1) Localda mavjud bo'lsa — statik fayldan ber.
  const name = fileNameFromUrl(originalUrl);
  if (name && localThumbnails.has(name)) {
    return `/thumbnails/${name}`;
  }

  // 2) To'liq http(s) URL — xom holda (hali yuklab olinmagan yangi rasm).
  if (/^https?:\/\//i.test(originalUrl)) return originalUrl;

  // 3) Eski nisbiy /images/<fayl> -> legacy S3.
  const match = originalUrl.match(
    /\/images\/([^/?]+(\.png|\.jpg|\.jpeg|\.webp|\.gif))/i
  );
  if (match) {
    return `https://s3.eu-north-1.amazonaws.com/seven.edu/images/${match[1]}`;
  }

  return PLACEHOLDER_THUMBNAIL;
}
