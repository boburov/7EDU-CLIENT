"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./components/Home";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa — uni o'z sahifasiga
    // yo'naltiramiz. MUHIM: bu yerda localStorage.clear() qilinmaydi, aks holda
    // har safar "/" ga tushganda yaroqli token o'chib, login/logout aylanishi
    // (loop) yuzaga keladi.
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      router.replace(`/user/${userId}`);
    }
  }, [router]);

  return (
    <div>
      <HomePage />
    </div>
  );
}
