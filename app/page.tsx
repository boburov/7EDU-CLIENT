"use client";
import { useEffect } from "react";
import Home from "./components/Home";

export default function page() {
  useEffect(() => {
    const tg = (window as any).Telegram;
    if (typeof window !== "undefined" && tg?.WebApp) {
      tg.WebApp.ready();
      tg.WebApp.expand();
    }
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}
