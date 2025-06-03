"use client";

import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPage = () => {
  const router = useRouter()
  const [code, setCode] = useState("");
  const [email, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("userEmail");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  console.log(email);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email || !code) {
      setMessage("Kod kiritilmagan yoki Xato!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/verify", {
        email,
        code,
      });

      setMessage(res.data.msg || "Email muvaffaqiyatli tasdiqlandi");
      
      router.push('/user')
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-white max-w-md mx-auto">
      <Link href="signup">
        <ArrowLeft size={32} strokeWidth={1.5} className="mb-6" />
      </Link>

      <h1 className="text-3xl text-center mb-6 font-semibold">Emailni Tasdiqlash</h1>

      <form
        onSubmit={handleVerify}
        className="flex flex-col items-center gap-4"
      >
        <input type="text" value={email} onChange={(e) => { setToken(e.target.value) }} />
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          placeholder="Tasdiqlash kodini kiriting"
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
