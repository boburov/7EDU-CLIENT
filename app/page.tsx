"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./components/Home";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
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
