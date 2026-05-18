"use client";
import { useEffect } from "react";
import HomePage from "./components/Home";

export default function Page() {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <div>
       <div
      style={{
        padding: "56.25% 0 0 0",
        position: "relative",
      }}
    >
      <iframe
        src="https://player.vimeo.com/video/1174505046?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        title="ru55"
      />
    </div>
      <HomePage />
    </div>
  );
}
