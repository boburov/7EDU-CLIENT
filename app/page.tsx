"use client"
import { useEffect } from "react";
import { decodeToken } from "./api/service/api";
import Home from "./components/Home";

export default function page() {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);

  //   if (token) {
  //     decodeToken(token).then((decoded) => {
  //       console.log("✅ Token decoded:", decoded);
  //     }).catch((err) => {
  //       console.error("❌ Token decoding error:", err);
  //     });
  //   }
  // }, []);
  return (
    <div>
      <Home />
    </div>
  );
}
