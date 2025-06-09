"use client"
import { getMe } from '@/app/api/service/api'
import {
  Activity,
  BookOpenCheck,
  ClipboardCheck,
  Languages,
  Coins,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [coins, setCoins] = useState("")

  useEffect(() => {
    getMe().then((e) => {
      setCoins(e.coins)
    })
  }, [])

  const actions = [
    {
      icon: <Activity size={40} className="text-gray-400" />,
      title: "Kirish",
      description: "Platformaga kirganingiz uchun tanga olasiz",
      point: 1,
      color: "gray",
    },
    {
      icon: <BookOpenCheck size={40} className="text-blue-400" />,
      title: "Darsni o'qish",
      description: "Har bir darsni o'qib bo'lganingizda sizga tanga beriladi",
      point: 5,
      color: "blue",
    },
    {
      icon: <ClipboardCheck size={40} className="text-green-400" />,
      title: "Testni bajarish",
      description: "Testni muvaffaqiyatli yakunlaganingizda tanga olasiz",
      point: 5,
      color: "green",
    },
    {
      icon: <Languages size={40} className="text-yellow-400" />,
      title: "Lug'atni yodlash",
      description: "Yangi so'zlar yodlaganingizda bonus tangalar beriladi",
      point: 10,
      color: "yellow",
    },
  ]

  return (
    <div className="container max-w-2xl mx-auto pt-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Tangalarni qanday olish mumkin?</h1>

      {actions.map((item, index) => (
        <div
          key={index}
          className={`w-full rounded-xl border border-${item.color}-400/30 bg-${item.color}-500/10 p-4 flex items-start justify-between gap-4 shadow-md`}
        >
          <div className="flex gap-4 items-start">
            {item.icon}
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-white/70">{item.description}</p>
            </div>
          </div>
          <span
            className={`text-${item.color}-400 bg-${item.color}-400/10 border border-${item.color}-400/30 px-3 py-1 rounded-lg font-semibold text-sm text-center`}
          >
            +{item.point} ball
          </span>
        </div>
      ))}

      <div className="mt-8 flex items-center gap-3 text-xl font-bold">
        <Coins size={26} className="text-yellow-400" strokeWidth={1.5} />
        <span>Jami tangalar: {coins}</span>
      </div>
    </div>
  )
}

export default Page
