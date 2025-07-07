import React from "react";
import { GraduationCap, School2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen w-full px-4 py-10 relative flex items-center justify-center">

      {/* Logo yuqori chapda */}
      <div className="absolute top-6 left-6 z-10">
        <div className="p-[6px] rounded-full bg-white/5 backdrop-blur-md shadow-lg border border-white/10 transition hover:scale-105">
          <Image
            src={logo}
            alt="Seven Edu Logo"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="w-full max-w-md space-y-8 text-center z-10">

        {/* Matn */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          Platformaga kirish usulini tanlang
        </h1>

        {/* Tugmalar */}
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow-md backdrop-blur transition"
          >
            <div className="bg-[#00C8351A] p-3 rounded-full">
              <GraduationCap size={26} className="text-[#00C835]" />
            </div>
            <span className="text-base sm:text-lg font-medium text-white">
              O‘quvchi sifatida kirish
            </span>
          </Link>

          <Link
            href="/auth/signup"
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow-md backdrop-blur transition"
          >
            <div className="bg-[#00C8351A] p-3 rounded-full">
              <School2 size={26} className="text-[#00C835]" />
            </div>
            <span className="text-base sm:text-lg font-medium text-white">
              Mehmon sifatida kirish
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
