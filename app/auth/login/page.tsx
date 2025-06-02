"use client";

import Link from "next/link";
import { ArrowLeft, School } from "lucide-react";
import { login } from "../../api/service/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const StudentLoginPage = () => {

  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [userID, setUserIDuserID] = useState("");
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:9011/auth/login`, { username, surname, userID }).then((e) => {
        let path = ``
        const userId = e.data.checkId.userID
        e.data.msg === "login" ? path = `/user/${userId}` : path = 'auth/login'
        router.push(path)
      })


    } catch (error) {
      setMsg('Server error')
    }
  };


  return (
    <section className="container pt-5">
      <Link href="/">
        <ArrowLeft size={44} strokeWidth={1.5} className="text-white" />
      </Link>

      <div className="flex flex-col items-center">
        <School size={128} className="text-white mb-2" strokeWidth={0.5} />
        <h3 className="text-3xl font-bold text-white mb-10">O’quvchi Sifatida Kirish</h3>
        {msg}
        <form className="space-y-5">
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ism"
            className="w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
          />
          <input
            type="text"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Familya"
            className="w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
          />
          <input
            type="text"
            name="id"
            value={userID}
            onChange={(e) => setUserIDuserID(e.target.value)}
            placeholder="ID"
            className="w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white mb-2"
          >
            Kirish
          </button>
        </form>

        <Link href="/" className="text-white/80 font-[robolight] tracking-wide underline">
          <>Mehmon sifatida kirish</>
        </Link>
      </div>
    </section>
  );
};

export default StudentLoginPage;
