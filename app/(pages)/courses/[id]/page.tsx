"use client"

import { GetCourseById } from "@/app/api/service/api"
import { Lock, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Lesson {
  id: string
  videoUrl: string
  title: string
  isDemmo?: boolean
}

const Page = () => {
  const params = useParams()
  const courseId = params.id

  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    if (!courseId) return
    GetCourseById(String(courseId)).then((res) => {
      setLessons(res?.data.lessons || [])
    })
  }, [courseId])

  return (
    <div className="container mx-auto px-4 py-10">
      {!lessons.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white text-xl font-medium mt-10"
        >
          Hozircha darslar mavjud emas 😢 <br />
          Ammo tez orada ular sizni kutmoqda!
        </motion.div>
      ) : (
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <Link
              key={index}
              href={`${courseId}/lessons/${lesson.id}`}
              className="block">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:scale-[1.01] transition-transform duration-300"
              >
                <div>
                  <h2 className="text-white text-xl font-semibold mb-1">
                    {index + 1}-dars: <span className="text-green-600">{lesson.title}</span>
                  </h2>
                  <p className="text-white/70 text-sm robo-light">
                    Katta orzular katta qurbonlik talab qiladi ✨
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {lesson.isDemmo ? (
                    <div className="flex flex-col items-center">
                      <Lock className="w-10 h-10 text-red-400" />
                      <span className="text-sm text-white/60">Qulflangan</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Play className="w-10 h-10 text-green-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
