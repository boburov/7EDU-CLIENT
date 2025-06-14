"use client";

import { GetLessonsById } from "@/app/api/service/api";
import { FileX, RefreshCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ 1. Interface: har bir so‘zni ifodalaydi
interface DictonaryItem {
  id: number;
  word: string;
  translation: string;
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
    <div className="container text-white">
      {dictonary.length > 0 && <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📚 Vocabulary Jadvali
        </h1>

        <div className="overflow-x-auto rounded-sm shadow-xl">
          <table className="min-w-full text-sm text-left bg-[#1f1f1f]/60 border border-gray-600/50 rounded-xl overflow-hidden">
            <thead className="bg-[#2c2c2c] text-gray-300 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 border-b border-gray-600">#</th>
                <th className="px-6 py-3 border-b border-gray-600">So'z (Inglizcha)</th>
                <th className="px-6 py-3 border-b border-gray-600">Tarjimasi (O'zbekcha)</th>
              </tr>
            </thead>
            <tbody>
              {dictonary.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#333333] transition duration-300"
                >
                  <td className="px-6 py-4 border-b border-gray-700">{idx + 1}</td>
                  <td className="px-6 py-4 border-b border-gray-700 font-semibold">
                    {item.word}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700 text-green-400">
                    {item.translation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Yodlagan so‘zlaringizni kundalik amalda qo‘llashga harakat qiling!
        </p>
      </div>}

      {dictonary.length == 0 && <div className="max-w-xl mx-auto mt-16 px-6 py-8 border border-white/10 rounded-2xl backdrop-blur-md bg-white/5 shadow-2xl text-white text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white/10 rounded-full border border-white/20 shadow-inner">
            <FileX size={32} className="text-red-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Vocabulary topilmadi</h2>
        <p className="text-gray-300 text-sm mb-6">
          Ushbu dars uchun hozircha hech qanday so‘z mavjud emas. Admin tomonidan hali kiritilmagan bo‘lishi mumkin.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition text-sm"
        >
          <RefreshCcw size={18} />
          Qayta yuklash
        </button>
      </div>
      }
    </div>
  );
}
