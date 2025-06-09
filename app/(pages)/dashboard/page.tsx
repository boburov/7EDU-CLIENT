import { BarChart, ChartArea, DollarSign, Gift, Leaf, User } from "lucide-react"
import Link from "next/link"

const page = () => {
  return (
    <div className="container pt-5">
      <Link href='dashboard/progress' className="w-full h-20 border flex items-center px-5 gap-5 border-green-500/30 bg-green-500/10 rounded-xl mb-5 hover:bg-green-500/20 transition">
        <ChartArea width={50} height={50} strokeWidth={1} className="text-green-500" />
        <p className="text-white text-xl">Jarayon</p>
      </Link>

      <Link href='dashboard/activity' className="w-full h-20 border flex items-center px-5 gap-5 border-blue-500/30 bg-blue-500/10 rounded-xl mb-5 hover:bg-blue-500/20 transition">
        <User width={50} height={50} strokeWidth={1} className="text-blue-500" />
        <p className="text-white text-xl">Aktivlik</p>
      </Link>

      <Link href='dashboard/gifts' className="w-full h-20 border flex items-center px-5 gap-5 border-yellow-500/30 bg-yellow-500/10 rounded-xl mb-5 hover:bg-yellow-500/20 transition">
        <Gift width={50} height={50} strokeWidth={1} className="text-yellow-500" />
        <p className="text-white text-xl">Sovrinlar</p>
      </Link>

      <Link href='dashboard/coins' className="w-full h-20 border flex items-center px-5 gap-5 border-gray-500/30 bg-gray-500/10 rounded-xl hover:bg-gray-500/20 transition">
        <DollarSign width={50} height={50} strokeWidth={1} className="text-gray-500" />
        <p className="text-white text-xl">Tangallar</p>
      </Link>


    </div>
  )
}

export default page