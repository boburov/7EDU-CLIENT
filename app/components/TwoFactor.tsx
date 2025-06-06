"use client"

import { useRouter } from "next/navigation";
import { useRef, useState } from "react"
import api, { getUserById, updateUser, verify } from "../api/service/api";
import apiEndpoins from "../api/api.endpoin";

function TwoFactor({ codeSMS = "", userId = "" }) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""])

  console.log(`Correct Code :`, codeSMS);


  const email = String(localStorage.getItem("userEmail"))

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const chechCode = async (codeSMS: string) => {
    try {
      if (code.join("") === codeSMS) {
        const frcode = code.join("")
        api.post(apiEndpoins.verifyCode, { email, code: frcode }).then((e) => {
          console.log(e.data);
          if (e.data.token) {
            localStorage.setItem("token", e.data.token);
          }
        })

        setSuccess("Kod to‘g‘ri! Siz muvaffaqiyatli tasdiqlandingiz.");
        setTimeout(() => router.push(`/user/${userId}`), 1000);

      } else { 
        setError("Kod noto‘g‘ri. Qayta urinib ko‘ring.");

      }
    } catch (error) {
      setError("Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko‘ring.");
      console.log('Xatolik:', error);

    }
  };



  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();

    }
  };

  return (
    <div className="px-4">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

      <section className="grid grid-cols-6 gap-2 w-full mb-4">
        {code.map((elem, i) => {
          return <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            maxLength={1}
            value={elem}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            type="text"
            className="h-14 rounded-md bg-black/60 text-white text-xl text-center" />
        })}
      </section>

      <section className="flex items-center justify-between gap-2 w-full">
        <button
          onClick={() => chechCode(codeSMS)}
          className="uppercase text-white border border-white bg-black w-1/2 h-12">tasdqilash</button>
        <button
          onClick={() => setCode(["", "", "", "", "", ""])}
          className="uppercase text-white border border-white bg-white/10 w-1/2 h-12">tozalash</button>
      </section>

    </div>
  )
}

export default TwoFactor