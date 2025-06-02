"use client"

// imports liberays
import { userData } from "@/app/api/api.path"
import { useParams } from "next/navigation"

const page = () => {
  const path = useParams()

  return (
    <div className="container">
      {userData.userCourses.map((e, i) => {
        if (path.name === e.courseName.toLowerCase()) {
          return <h1 key={i}>{e.courseName}</h1>
        }
      })}
    </div>
  )
}

export default page