"use client";

import { getUserByEmail } from "@/app/api/service/api";
import TwoFactorForm from "@/app/components/TwoFactor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPage = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter()
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setId] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) setEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    try {

      const check = localStorage.getItem("userEmail");
      if (!check) {
        console.error("Email topilmadi");
        return;
      }

      const email = localStorage.getItem("userEmail");
      const user = getUserByEmail(String(email)).then((e) => {
        setCode(e.code)
        setId(e.id)
      });

      if (!user) {
        console.log(`HatoLik`);
      }

    } catch (error) {
      console.log(error);
    }

  }, [])


  return (
    <div className="h-screen flex items-center justify-center">
      <TwoFactorForm userId={userId} codeSMS={code} />
    </div>
  );
};

export default VerifyPage;
