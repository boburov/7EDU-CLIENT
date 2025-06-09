"use client"

import { GetCourseById } from "@/app/api/service/api"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


interface Lessons {
  videoUrl: string
  title: string
}

const page = () => {
  const path = useParams()
  const [lessons, setlessons] = useState()
  const couseId = path.id

  useEffect(() => {
    GetCourseById(String(couseId)).then((lessons) => {
      setlessons(lessons?.data.lessons)
    })
  }, [])

  console.log(lessons);

  return (
    <div className="container">
      {/* <video src={lessons?.videoUrl}></video> */}
      {/* <h1>{lessons.title}</h1> */}
    </div>
  )
}

export default page