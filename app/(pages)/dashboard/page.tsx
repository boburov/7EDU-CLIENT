"use client"

import {
  Gift,
  Coins,
  UserCheck,
  GaugeCircle,
} from "lucide-react"
import Link from "next/link"

const links = [
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
  },
]

const Page = () => {
  return (
    <div className="container max-w-2xl mx-auto pt-6 space-y-5 text-white">
      <h1 className="text-2xl font-bold mb-4">Shaxsiy Kabinet</h1>

      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={` h-26
            w-full block rounded-xl border border-${link.color}-500/30 bg-${link.color}-500/10 
            hover:bg-${link.color}-500/20 transition shadow-sm px-4 py-3
          `}
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
  )
}

export default Page
