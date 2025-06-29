"use client";
import { getMe } from "@/app/api/service/api";
import { useEffect } from "react"

const page = () => {

  useEffect(() => {
    getMe().then(res => {
      console.log("User data:", res);
    }).catch(err => {
      console.error("Error fetching user data:", err);
    });
  }, []);
  return (
    <div>page</div>
  )
}

export default page