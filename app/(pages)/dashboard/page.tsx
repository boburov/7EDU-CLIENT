"use client";

import { allCourse, GetCourseById, getMe } from "@/app/api/service/api";
import { Lock, Play, Gift, Coins, UserCheck, GaugeCircle, Award } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  lessons: [];
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

const dashboardLinks = [
  {
    href: "dashboard/progress",
    icon: <GaugeCircle size={40} className="text-green-400" />,
    title: "Jarayon",
    description: "Darslar, testlar va yodlangan so‘zlar statistikasi",
    color: "green",
  },
  {
    href: "dashboard/activity",
    icon: <UserCheck size={40} className="text-blue-400" />,
    title: "Aktivlik",
    description: "Kundalik kirish, qatnashgan darslar va davomatingiz",
    color: "blue",
  },
  {
    href: "dashboard/gifts",
    icon: <Gift size={40} className="text-yellow-400" />,
    title: "Sovrinlar",
    description: "Harakatlaringiz uchun olingan sovrinlar ro'yxati",
    color: "yellow",
  },
  {
    href: "dashboard/coins",
    icon: <Coins size={40} className="text-gray-300" />,
    title: "Tangalar",
    description: "Toplagan ballaringiz va ularni ishlatish tarixi",
    color: "gray",
  },{
    href: "dashboard/certificate",
    icon: <Award size={40} className="text-sky-300" />,
    title: "Certificatlarim",
    description: "Sizning sertifikatlaringiz va ularni olish jarayoni",
    color: "sky",
  },
];

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        getMe().then((data) => {          
          data.courses.map((courseId: any) => {
            GetCourseById(courseId.courseId).then((ddd) => {
              setUserCourses((prev) => [...prev, ddd]);
            });
          });
        });

        const [allCoursesData, meData] = await Promise.all([
          allCourse(),
          getMe(),
        ]);
        setCourses(allCoursesData);
        setUser(meData);
      } catch (e) {
        console.error("fetchAll error:", e);
      }
    };

    fetchAll();
  }, []);

  return (
    <section className="container p-5 text-white">
      <h1 className="text-xl mb-1">
        Kurslarim soni: {user?.courses?.length ?? 0}
      </h1>

      {/* Shaxsiy kabinet links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {dashboardLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`block rounded-xl border border-${link.color}-500/60 bg-${link.color}-500/10 hover:bg-${link.color}-500/20 transition shadow-sm px-4 py-3`}
          >
            <div className="flex gap-4 items-center">
              {link.icon}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{link.title}</h2>
                <p className="text-sm text-white/70">{link.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-7">
        {userCourses.map((kurs) => (
          <li
            key={kurs.id}
            className="flex items-center justify-between gap-4 p-2 bg-white/15 border border-white/15 text-white rounded-2xl transition-transform hover:scale-105"
          >
            <img
              src={kurs.thumbnail}
              alt={`${kurs.title} kursining rasmi`}
              className="w-1/2 h-32 object-cover rounded-xl"
            />
            <div className="flex flex-col w-full h-11/12 justify-between items-start font-[robolight] tracking-wide gap-1">
              <h3 className="uppercase font-bold text-green-500 text-base mb-1 tracking-widest">
                {kurs.title}
              </h3>
              <span className="text-sm leading-2">
                <strong>Darslar Soni:</strong>{" "}
                <span className="font-light">{kurs.lessons?.length || 0}</span>
              </span>
              <span className="my-1 text-sm leading-5 w-36 truncate">
                <strong>Maqsad: </strong> {kurs.goal}
              </span>
              <Link
                href={`/courses/${kurs.id}`}
                className="px-3 py-1.5 bg-green-500 rounded-md flex items-center gap-2 text-xs"
              >
                <Play size={18} /> {`Darslarni Ko'rish`}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <h1 className="text-2xl font-bold mb-4">Barcha Kurslar</h1>

      {courses.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
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
                  href={`/courses/${kurs.id}`}
                  className="px-2 py-1.5 bg-green-500 rounded-md flex items-center gap-2 text-xs"
                >
                  <Lock width={18} /> {`Demo Darslarni Ko'rish`}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>{`Xozircha kurslar yo'q`}</h2>
      )}
    </section>
  );
};

export default UserPage;
