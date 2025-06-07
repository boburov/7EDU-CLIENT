"use client";

import { getUserByEmail } from "@/app/api/service/api";
import TwoFactorForm from "@/app/components/TwoFactor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPage = () => {
  
  const router = useRouter()
  
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {

      getUserByEmail(email).then((user) => {
        if (user) {
          localStorage.setItem("userId", user.userId)
        } else {
          router.push('signup')
        }
      });
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <TwoFactorForm />
    </div>
  );
};

export default VerifyPage;
