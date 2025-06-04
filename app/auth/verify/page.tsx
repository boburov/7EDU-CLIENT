"use client";

import TwoFactorForm from "@/app/components/TwoFactor";
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

      router.push(`/user/${email}`)
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <TwoFactorForm />
    </div>
  );
};

export default VerifyPage;
