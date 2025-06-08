"use client";

import { allCourse, getMe } from "@/app/api/service/api";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  lessons: any[];
  goal: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  courses: Course[];
  phonenumber: string;
  coin: number;
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
    <section className="container p-5 text-white">
      <h1>Kurslarim soni: {user?.courses?.length ?? 0}</h1>

      <h1 className="text-2xl font-bold mb-4">Barcha Kurslar</h1>

      {courses.length > 0 ? (
        <ul className="grid grid-cols-3 gap-5 max-md:grid-cols-1 mb-10">
          {courses.map((kurs) => (
            <li
              key={kurs.id}
              className="flex items-center justify-between gap-4 px-2 py-2 bg-white/15 border border-white/15 text-white rounded-2xl transition-transform hover:scale-105"
            >
              <img
                src={kurs.thumbnail}
                alt={`${kurs.title} kursining rasmi`}
                className="w-1/2 h-32 object-cover rounded"
              />
              <div className="flex flex-col w-full h-11/12 justify-between items-start font-[robolight] tracking-wide">
                <h3 className="uppercase font-bold text-green-500 text-base mb-2 tracking-widest">
                  {kurs.title}
                </h3>
                <span className="text-base leading-2">
                  <strong>Darslar Soni:</strong>{" "}
                  <span className="font-light">{kurs.lessons.length}</span>
                </span>
                <span className="my-1 text-sm leading-5">
                  <strong>Maqsad: </strong> {kurs.goal}
                </span>
                <Link
                  href={`/kurs/${kurs.id}`} // kursga mos yo‘l berildi
                  className="px-3 py-1.5 bg-green-500 rounded-md flex items-center gap-2 text-sm"
                >
                  <Lock /> Demo Darslarni Ko'rish
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Xozircha kurslar yo'q</h2>
      )}
    </section>
  );
};

export default UserPage;
