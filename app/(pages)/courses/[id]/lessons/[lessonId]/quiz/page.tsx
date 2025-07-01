"use client"

import { getMe } from "@/app/api/service/api"
import { useEffect } from "react"


const page = () => {

  useEffect(()=>{
    getMe().then((ee)=>{
      console.log(ee);
    })
  },[])
  return (
    <div>page</div>
  )
}

export default page