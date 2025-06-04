import { useState } from "react";
import api, { verify } from "../api/service/api";

export default function TwoFactorForm() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const updated = [...codes];
      updated[index] = value;
      setCodes(updated);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleClear = () => {
    setCodes(["", "", "", ""]);
  };

  const handleVerify = () => {
    const email = String(localStorage.getItem("email"))

    const code = codes.join("");
    const res = verify(email, code)
    console.log("Verifying code:", res);
  };

  return (
    <form className="bg-black/40 backdrop-blur-2xl max-md:scale-90 text-white p-6 rounded-lg w-full shadow-lg flex flex-col items-center relative">


      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold">Emaliga kelgan kodni tasdiqlang</h2>
        <p className="text-base text-gray-400 mt-2">
          Enter the two-factor authentication code provided by the authenticator app
        </p>
      </div>

      <div className="flex gap-3 mb-5">
        {codes.map((value, i) => (
          <input
            key={i}
            id={`code-${i}`}
            maxLength={1}
            type="tel"
            className="w-10 h-10 text-center text-lg rounded border-2 border-neutral-800 bg-neutral-800 text-white focus:outline-none focus:border-white focus:scale-105 transition"
            value={value}
            onChange={(e) => handleChange(e.target.value, i)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleVerify}
          className="bg-gray-100 text-black font-medium px-4 py-2 rounded hover:bg-white transition"
        >
          Verify
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="border border-gray-300 text-gray-300 font-medium px-4 py-2 rounded hover:border-red-500 hover:text-red-500 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
