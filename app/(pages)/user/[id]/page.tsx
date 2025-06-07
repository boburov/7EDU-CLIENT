"use client";

import { getMe } from "@/app/api/service/api";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res))
      .catch((e) => console.error("getMe error:", e));
  }, []);
  console.log();

  return (
    <section className="container p-5 text-white">
      <h1>Kurslar soni: {user?.courses?.length}</h1>
      <h1 className="text-2xl font-bold">Barcha kurslar</h1>
    </section>
  );
};

export default UserPage;
