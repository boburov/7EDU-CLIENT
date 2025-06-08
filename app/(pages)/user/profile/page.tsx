"use client";

import { useEffect, useState } from "react";
import { Wallet, BookOpenCheck, Bell, Settings } from "lucide-react";
import { allCourse, getMe } from "@/app/api/service/api";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  courses: Course[];
  phonenumber: string;
  coins: number;
}

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    allCourse()
      .then((data) => setCourses(data))
      .catch((e) => console.error("allCourse error:", e));

    getMe()
      .then((data) => setUser(data))
      .catch((e) => console.error("getMe error:", e));
  }, []);

  return (
    <div className="container mx-auto pt-10 px-4 text-white">
      {user ? (
        <div className="flex flex-col gap-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/15 p-4 rounded-xl flex items-center gap-4">
              <BookOpenCheck className="text-green-400" />
              <div>
                <p className="text-gray-300">Kurslar soni</p>
                <p className="font-semibold text-white">{user.courses.length} ta</p>
              </div>
            </div>

            <div className="bg-white/15 p-4 rounded-xl flex items-center gap-4">
              <Bell className="text-blue-400" />
              <div>
                <p className="text-gray-300">Bildirishnomalar</p>
                <p className="font-semibold text-white">0 ta</p>
              </div>
            </div>

            <div className="bg-white/15 p-4 rounded-xl flex items-center gap-4">
              <BookOpenCheck className="text-purple-400" />
              <div>
                <p className="text-gray-300">Umumiy kurslar</p>
                <p className="font-semibold text-white">{courses.length} ta</p>
              </div>
            </div>

            <Link href='settings' className="bg-white/15 p-4 rounded-xl flex items-center gap-4">
              <Settings className="text-yellow-400" />
              <div>
                <p className="text-gray-300">Foydalanuvchi Sozlamalari</p>
                <p className="font-semibold text-white">Bu yerda siz profiliingizni tahrirlashingiz mumkun</p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Yuklanmoqda...</p>
      )}
    </div>
  );
};

export default UserPage;
