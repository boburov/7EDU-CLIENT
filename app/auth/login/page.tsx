"use client";

import Link from "next/link";
import { ArrowLeft, School } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, forgotPassword } from "@/app/api/service/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
  
    try {
      const data = await login({ email, password });
  
      if (data) {
        const userId = data.checkId.userID;
        router.push(`/user/${userId}`);
      } else {
        setMsg("Login muvaffaqiyatsiz");
      }
    } catch (error) {
      
      const err = error as Error;
      console.log(err.message);
      setMsg("Parol yoki email noto‘g‘ri");
    }
  };

 
const handleForgotPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setMsg("");
  setLoading(true);
  try {
    await forgotPassword(email);
    setMsg("Yangi parol emailingizga yuborildi.");
    setForgotMode(false);
  } catch (error) {
    const err = error as Error;
    setMsg(err.message || "Email topilmadi");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="container pt-5">
      <Link href="/">
        <ArrowLeft size={44} strokeWidth={1.5} className="text-white" />
      </Link>

      <div className="flex flex-col items-center">
        <School size={128} className="text-white mb-2" strokeWidth={0.5} />
        <h3 className="text-3xl font-bold text-white mb-10">
          {forgotMode ? "Parolni tiklash" : "O’quvchi sifatida kirish"}
        </h3>

        {msg && <p className="mb-4 text-red-500 font-semibold">{msg}</p>}

        {!forgotMode ? (
          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              className="w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
              required
            />

            <button
              type="submit"
              className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white mb-2"
            >
              Kirish
            </button>

            <button
              type="button"
              onClick={() => setForgotMode(true)}
              className="text-white underline w-full text-center"
            >
              Parolni unutdingizmi?
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleForgotPassword}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ro‘yxatdan o‘tgan emailingizni kiriting"
              className="w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white mb-2"
            >
              Parolni tiklash
            </button>

            <button
              type="button"
              onClick={() => setForgotMode(false)}
              className="text-white underline w-full text-center"
            >
              Orqaga
            </button>
          </form>
        )}

        {!forgotMode && (
          <Link
            href="signup"
            className="text-white/80 font-[robolight] tracking-wide underline"
          >
            Mehmon sifatida kirish
          </Link>
        )}
      </div>
    </section>
  );
};

export default Login;
