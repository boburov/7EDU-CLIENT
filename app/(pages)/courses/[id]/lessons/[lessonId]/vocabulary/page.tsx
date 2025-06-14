"use client";

import { GetLessonsById } from "@/app/api/service/api";
import { FileX, ListChecks, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DictonaryItem {
  id: number;
  word: string;
  translated: string;
}

export default function VocabularyTable() {
  const { lessonId } = useParams() as { lessonId: string };
  const [dictonary, setDictonary] = useState<DictonaryItem[]>([]);

  useEffect(() => {
    GetLessonsById(lessonId).then((res) => {
      setDictonary(res.dictonary || []);
    });
  }, [lessonId]);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10 text-white">
      {dictonary.length > 0 ? (
        <div className="w-full">
          <h1 className="text-3xl font-extrabold mb-10 text-center flex items-center justify-center gap-3 text-yellow-500 drop-shadow-sm">
            <ListChecks size={38} />
            Vocabulary Jadvali
          </h1>

          <div className="overflow-x-auto bg-[#1f1f1f]/60 rounded-xl shadow-2xl border border-gray-600/40">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#2b2b2b] text-gray-300 uppercase tracking-wide text-[13px]">
                <tr>
                  <th className="px-6 py-4 border-b border-gray-700">#</th>
                  <th className="px-6 py-4 border-b border-gray-700">Inglizcha</th>
                  <th className="px-6 py-4 border-b border-gray-700">O‘zbekcha</th>
                </tr>
              </thead>
              <tbody>
                {dictonary.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#383838] transition duration-200"
                  >
                    <td className="px-6 py-4 border-b border-gray-800 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4 border-b border-gray-800 font-semibold text-white">{item.word}</td>
                    <td className="px-6 py-4 border-b border-gray-800 text-green-400">{item.translated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Yodlagan so‘zlaringizni kundalik hayotingizda ishlatishga harakat qiling.
          </p>

          <Link
            href={`test`}
            className="mt-8 inline-block w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto text-center px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold shadow-lg"
          >
            Testlarni yechish
          </Link>
        </div>
      ) : (
        <div className="mt-20 max-w-xl mx-auto px-6 py-10 border border-white/10 rounded-2xl bg-white/5 shadow-2xl backdrop-blur-md text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full border border-white/20 shadow-inner">
              <FileX size={32} className="text-red-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">Vocabulary topilmadi</h2>
          <p className="text-gray-300 text-sm mb-6">
            Ushbu dars uchun hozircha hech qanday so‘z mavjud emas. Admin tomonidan hali kiritilmagan bo‘lishi mumkin.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition text-sm text-white"
          >
            <RefreshCcw size={18} />
            Qayta yuklash
          </button>
        </div>
      )}
    </div>
  );
}
