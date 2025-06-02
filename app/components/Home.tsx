import React from "react";
import { GraduationCap, School2 } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Platformaga kirish usulini tanlang
        </h1>


        <div className="space-y-6">
          {/* O‘quvchi */}
          <Link
            href="/auth/login"
            className="w-full border border-white/20 rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition duration-200 group bg-white/5 hover:bg-white/10 backdrop-blur-sm"
          >
            <div className="bg-[#2097401A] p-3 rounded-full">
              <GraduationCap size={30} className="text-[#00C835]" />
            </div>
            <span className="text-xl font-semibold text-white">
              O‘quvchi sifatida kirish
            </span>
          </Link>
          
          {/* Mehmon */}
          <Link
            href="/auth/signup"
            className="w-full border border-white/20 rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition duration-200 group bg-white/5 hover:bg-white/10 backdrop-blur-sm"
          >
            <div className="bg-[#2097401A] p-3 rounded-full text-[#00C835]">
              <School2 size={30} strokeWidth={1.5}/>
            </div>
            <span className="text-xl font-semibold text-white">
              Mehmon sifatida kirish
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
