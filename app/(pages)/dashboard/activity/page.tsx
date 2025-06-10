import { CalendarDays, CalendarCheck, BarChart3 } from "lucide-react"

const Page = () => {
  return (
    <div className="container text-white space-y-6 pt-6">
      <h1 className="text-2xl font-semibold flex items-center gap-3 text-center w-full">
        O&apos;quvchining Davomat Qismi
      </h1>

      <div className="flex items-center gap-5 w-full rounded-xl border border-gray-400/30 bg-gray-500/10 text-gray-300 px-6 py-5 shadow">
        <CalendarDays className="text-gray-300" size={42} strokeWidth={1.5} />
        <div className="flex flex-col">
          <p className="text-xl font-medium">Haftalik</p>
          <p className="text-lg text-white/70">{0} kun</p>
        </div>
      </div>

      <div className="flex items-center gap-5 w-full rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 px-6 py-5 shadow">
        <CalendarCheck className="text-yellow-400" size={42} strokeWidth={1.5} />
        <div className="flex flex-col">
          <p className="text-xl font-medium">Oyda</p>
          <p className="text-lg text-white/70">{0} kun</p>
        </div>
      </div>

      <div className="flex items-center gap-5 w-full rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 px-6 py-5 shadow">
        <BarChart3 className="text-sky-400" size={42} strokeWidth={1.5} />
        <div className="flex flex-col">
          <p className="text-xl font-medium">4 Oyda</p>
          <p className="text-lg text-white/70">{0} kun</p>
        </div>
      </div>
    </div>
  )
}

export default Page
