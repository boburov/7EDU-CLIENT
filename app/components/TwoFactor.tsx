"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import api, { verifyCode } from "../api/service/api";
import apiEndpoints from "../api/api.endpoin";

interface TwoFactorProps {
  codeSMS: string;
  userId: string;
}

export default function TwoFactor() {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [userId, setUserId] = useState("")
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const email = typeof window !== 'undefined' ? localStorage.getItem("email") || "" : "";

  const handleChange = (val: string, idx: number) => {
    if (!/^[A-Za-z0-9]?$/.test(val)) return;
    const arr = [...code];
    arr[idx] = val.toUpperCase();
    setCode(arr);
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };



  const checkCode = async () => {
    const entered = String(code.join(""))
    if (entered.length !== 6) {
      setError("Iltimos, 6 belgidan iborat kod kiriting.");
      return;
    }
    setError(""); setSuccess("");
    try {
      await verifyCode({ email, code: entered }).then((e) => {
        setTimeout(() => router.push(`/user/${e.user.id}`), 1000);
      })

      setSuccess("Kod to‘g‘ri! Siz tasdiqlandingiz.");

    } catch (e: any) {
      setError(typeof e === "string" ? e : "Kod noto‘g‘ri.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="px-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {code.map((ch, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            maxLength={1}
            value={ch}
            onChange={e => handleChange(e.target.value, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            inputMode="text"
            className="h-14 rounded-md bg-black/60 text-white text-xl text-center"
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={checkCode} className="flex-1 uppercase text-white border border-white bg-black h-12 rounded-md">
          tasdiqlash
        </button>
        <button onClick={() => setCode(new Array(6).fill(""))} className="flex-1 uppercase text-white border border-white bg-white/10 h-12 rounded-md">
          tozalash
        </button>
      </div>
    </div>
  );
}
