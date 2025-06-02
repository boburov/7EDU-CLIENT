"use client"

import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);


  return (
    <section className="container p-5 text-white">


      {/* MY COURSES */}
      {/* {
        userData.userCourses.length > 0 && (<><h1 className="text-2xl font-bold mb-4">Kurslarim</h1>
          <ul className="grid grid-cols-3 gap-5 max-md:grid-cols-1 mb-10">
            {userData.userCourses.map((course, index) => {
              const progress =
                (course.showedLesssons / course.countOfLessons) * 100;

              return (
                <li
                  key={index}
                >
                  <Link href={userData.userId + '/' + 'courses/' + course.courseName}
                    className="flex items-center justify-between gap-4 px-2 py-1.5 bg-white/15 border border-white/15 text-white rounded-2xl transition-transform hover:scale-105"
                  >

                    <Image
                      src={course.courseIcon}
                      alt={`${course.courseName} icon`}
                      className="w-28 h-28 object-cover"
                    />
                    <div className="flex flex-col text-xs w-full font-[robolight]">
                      <h3 className="uppercase font-bold text-green-500 text-lg mb-1">{course.courseName}</h3>
                      <span>
                        Kurs davomiyligi:{" "}
                        <span className="font-light">{course.countOfLessons * 6} </span>
                        daqiqa
                      </span>
                      <span className="my-1">Maqsad: {course.mission}</span>

                      {/* Progress bar */}
      {/* <div className="flex items-center gap-3">
                        <span className="">Tugatildi:</span>
                        <div className="flex items-center gap-2 w-full">
                          <div className="w-full h-5 border rounded-full overflow-hidden px-[2px] py-0.5">
                            <div
                              className="h-full bg-green-600 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {Math.floor(progress)}%
                          </span>
                        </div>
                      </div>
                    </div>

                  </Link>
                </li>
              );
            })}
          </ul></>
        )
      } */}
      {/* ALL COURSES (COMING SOON) */}
      <h1 className="text-2xl font-bold">Barcha kurslar</h1>
    </section >
  );
};

export default page;
