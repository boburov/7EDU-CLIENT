"use client"
import { useEffect, useState } from "react";
import Home from "./components/Home";
import { getAllUser } from "./api/service/api";

export default function page() {
  const [data, setData] = useState()
  useEffect(() => {
    console.log(getAllUser().then(setData));
  }, [])
  console.log(data);

  return (
    <div>
      <Home />
    </div>
  );
}
