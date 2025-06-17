"use client";

import { getUserByEmail } from "@/app/api/service/api";
import TwoFactorForm from "@/app/components/TwoFactor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;

    if (!email) {
      router.push("signup");
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email);
        if (user?.email) {
          localStorage.setItem("email", user.email);
        } else {
          router.push("signup");
        }
      } catch (err) {
        setError("Failed to verify user. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <TwoFactorForm />
    </div>
  );
};

export default VerifyPage;
