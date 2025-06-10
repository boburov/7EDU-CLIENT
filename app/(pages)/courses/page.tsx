"use client";

import { allCourse } from "@/app/api/service/api";
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

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCoursesData = await allCourse();
        setCourses(allCoursesData);
      } catch (e) {
        console.error("fetchCourses error:", e);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="container text-white">
      <h1 className="text-2xl font-bold mb-4">Barcha Kurslar</h1>

      {courses.length > 0 ? (
        <ul className="grid grid-cols-2 gap-5 max-md:grid-cols-1 mb-10">
          {courses.map((kurs) => (
            <li
              key={kurs.id}
              className="flex items-center justify-between gap-4 px-2 py-2 bg-white/15 border border-white/15 text-white rounded-2xl transition-transform hover:scale-105"
            >
              <img
                src={kurs.thumbnail}
                alt={`${kurs.title} kursining rasmi`}
                width={300}
                height={128}
                className="w-1/2 h-32 object-cover rounded"
              />
              <div className="flex flex-col w-full h-11/12 gap-1.5 justify-between items-start font-[robolight] tracking-wide">
                <h3 className="uppercase font-bold text-green-500 text-base mb-1 tracking-widest">
                  {kurs.title}
                </h3>
                <span className="text-sm leading-2">
                  <strong>Darslar Soni:</strong>{" "}
                  <span className="font-light">{kurs.lessons.length}</span>
                </span>
                <span className="my-1 text-sm leading-5 w-36 truncate">
                  <strong>Maqsad: </strong> {kurs.goal}
                </span>
                <Link
                  href={`courses/${kurs.id}`}
                  className="px-3 py-1.5 bg-green-500 rounded-md flex items-center gap-2 text-xs"
                >
                  <Lock width={18} /> Demo Darslarni Ko&apos;rish
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Xozircha kurslar yo&apos;q</h2>
      )}
    </section>
  );
};

export default Page;
