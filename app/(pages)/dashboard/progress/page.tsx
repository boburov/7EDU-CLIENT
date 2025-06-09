import { Book } from "lucide-react"

const page = () => {
  return (
    <div className="container pt-5">
      <div className="flex items-center gap-5 w-full rounded-xl border mb-3 border-yellow-500/30 bg-yellow-600/10 text-yellow-500 h-20 px-3">
        <Book width={50} height={50} strokeWidth={1} />
        <p className="text-white text-xl">Lug'at</p>
      </div>
      <div className="flex items-center gap-5 w-full rounded-xl border mb-3 border-sky-500/30 bg-sky-600/10 text-sky-500 h-20 px-3">
        <Book width={50} height={50} strokeWidth={1} />
        <p className="text-white text-xl">Savollar</p>
      </div>
      <div className="flex items-center gap-5 w-full rounded-xl border border-gray-500/30 bg-gray-600/10 text-gray-500 h-20 px-3">
        <Book width={50} height={50} strokeWidth={1} />
        <p className="text-white text-xl">Test</p>
      </div>
    </div>
  )
}

export default page