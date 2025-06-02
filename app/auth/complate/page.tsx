"use client";

import { getUserById } from "@/app/api/service/api";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPage = () => {
  const router = useRouter()
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    getUserById(token)

    if (!token || !code) {
      setMessage("Token yoki kod kiritilmagan!");
      setLoading(false);
      return;
    }

    console.log(localStorage.getItem("token"));


    try {
      const res = await axios.post("http://localhost:3000/auth/verify", {
        token,
        code,
      });

      setMessage(res.data.msg || "Email muvaffaqiyatli tasdiqlandi");
      router.push('complate')
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };
  console.log(token);


  return (
    <div className="container py-5 text-white max-w-md mx-auto">
      <Link href="signup">
        <ArrowLeft size={32} strokeWidth={1.5} className="mb-6" />
      </Link>

      <h1 className="text-3xl text-center mb-6 font-semibold">Profilni To'ldirish</h1>

      <form
        onSubmit={handleVerify}
        className="flex flex-col items-center gap-4"
      >
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          placeholder="Isim"
          className="w-full h-12 px-4 rounded-md bg-[#1e2916] border border-white/20 text-white text-lg"
          type="text"
        />
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          placeholder="Familya"
          className="w-full h-12 px-4 rounded-md bg-[#1e2916] border border-white/20 text-white text-lg"
          type="text"
        />
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          placeholder="Telefon Raqam"
          className="w-full h-12 px-4 rounded-md bg-[#1e2916] border border-white/20 text-white text-lg"
          type="text"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white"
        >
          {loading ? "Yuborilmoqda..." : "Tasdiqlash"}
        </button>
      </form>

      {message && (
        <p className="text-center mt-6 text-yellow-400 font-medium">{message}</p>
      )}
    </div>
  );
};

export default VerifyPage;
