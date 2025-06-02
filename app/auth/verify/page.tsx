"use client"

import { authService } from "@/app/api/service/auth"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const page = () => {

  return (
    <div className="container py-5 text-white">

      <Link href="signup">
        <ArrowLeft size={44} strokeWidth={1.5} />
      </Link>

      <h1 className="text-3xl text-center my-20">Emailni Tasqidlang</h1>

      <form action="" className="flex flex-col items-center justify-between gap-2">
        
        <input onChange={(e) => { authService.verifyEmail(Number(e.target.value)) }} placeholder="kodni kiriting" className="w-full h-14 px-4 rounded-md bg-[#1e291685] border border-white/20 text-xl" type="number" name="" id="" />
        
        <button
          type="submit"
          className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white mb-2"
        >
          Tasdiqlash
        </button>
      </form>

    </div>
  )
}

export default page