import type { Metadata } from "next";
import PrivacyPolicyPage from "../privacy-policy/page";

/**
 * Alias yo'l: /privicy-policy
 *
 * Asosiy sahifa /privacy-policy manzilida. Bu yo'l imlodagi xatolik bilan
 * tarqatilgan havolalar uchun qoldirilgan: Play Console yoki tashqi havolaga
 * shu manzil kiritilgan bo'lsa ham sahifa 200 bilan ochilishi kerak, chunki
 * do'kon tekshiruvi 404 ni rad javob deb hisoblaydi.
 *
 * Qidiruv tizimlari uchun canonical asosiy manzilga qaratilgan.
 */

export const metadata: Metadata = {
  title: "Privacy Policy — Maxfiylik siyosati | SevenEdu",
  description:
    "SevenEdu mobil ilovasi va veb-saytining maxfiylik siyosati: qanday ma'lumotlar yig'iladi, nima uchun ishlatiladi, kimlar bilan ulashiladi, qanday himoyalanadi, qancha saqlanadi va akkaunt qanday o'chiriladi.",
  alternates: { canonical: "/privacy-policy" },
};

export default PrivacyPolicyPage;
