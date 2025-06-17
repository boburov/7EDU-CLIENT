"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookText,
  HelpCircle,
  ClipboardCheck,
  ChartArea,
} from "lucide-react";
import api from "@/app/api/service/api";

type StatEntry = {
  date: string;
  vocabulary: { total: number; correct: number };
  quiz: { total: number; correct: number };
  test: { total: number; correct: number };
};

const DailyStats = () => {
  const [data, setData] = useState<StatEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState<string>("");

  const getSummary = (entries: StatEntry[]) => {
    return entries.reduce(
      (acc, curr) => {
        acc.vocabulary.total += curr.vocabulary?.total ?? 0;
        acc.vocabulary.correct += curr.vocabulary?.correct ?? 0;
        acc.quiz.total += curr.quiz?.total ?? 0;
        acc.quiz.correct += curr.quiz?.correct ?? 0;
        acc.test.total += curr.test?.total ?? 0;
        acc.test.correct += curr.test?.correct ?? 0;
        return acc;
      },
      {
        vocabulary: { total: 0, correct: 0 },
        quiz: { total: 0, correct: 0 },
        test: { total: 0, correct: 0 },
      }
    );
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/user/daily-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const raw = res.data;
        const dailyStats = Array.isArray(raw) ? raw : raw?.data || [];

        setData(dailyStats);
      } catch (err) {
        console.error("Kundalik statistikani olishda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const filteredData = filterDate
    ? data.filter((entry) => entry.date === filterDate)
    : data;
  const summary = getSummary(filteredData);

  if (loading)
    return <div className="text-white text-center py-10">Yuklanmoqda...</div>;

  return (
    // <div className="container text-white pt-6 space-y-4 max-w-3xl mx-auto">
    //   <h2 className="text-2xl font-semibold mb-4 text-center">
    //     📅 Har kunlik faoliyat
    //   </h2>

    //   <div className="mb-6">
    //     <label className="block mb-2 text-sm text-gray-300">
    //       Kunni tanlang:
    //     </label>
    //     <input
    //       type="date"
    //       value={filterDate}
    //       onChange={(e) => setFilterDate(e.target.value)}
    //       className="bg-gray-700 text-white p-2 rounded w-full"
    //     />
    //   </div>

    //   {filteredData.map((entry) => (
    //     <div
    //       key={entry.date}
    //       className="rounded-xl border border-gray-500/30 bg-gray-500/10 px-5 py-4 shadow"
    //     >
    //       <button
    //         className="flex items-center justify-between w-full text-left"
    //         onClick={() =>
    //           setExpanded(expanded === entry.date ? null : entry.date)
    //         }
    //       >
    //         <span className="text-lg font-medium">{entry.date}</span>
    //         {expanded === entry.date ? <ChevronUp /> : <ChevronDown />}
    //       </button>

    //       {expanded === entry.date && (
    //         <div className="mt-4 space-y-3">
    //           <div className="flex justify-between items-center text-amber-400">
    //             <div className="flex items-center gap-3">
    //               <BookText /> <p>Lug'at</p>
    //             </div>
    //             <p>
    //               {entry.vocabulary?.correct ?? 0} /{" "}
    //               {entry.vocabulary?.total ?? 0}
    //             </p>
    //           </div>

    //           <div className="flex justify-between items-center text-rose-400">
    //             <div className="flex items-center gap-3">
    //               <HelpCircle /> <p>Savollar</p>
    //             </div>
    //             <p>
    //               {entry.quiz?.correct ?? 0} / {entry.quiz?.total ?? 0}
    //             </p>
    //           </div>

    //           <div className="flex justify-between items-center text-emerald-400">
    //             <div className="flex items-center gap-3">
    //               <ClipboardCheck /> <p>Test</p>
    //             </div>
    //             <p>
    //               {entry.test?.correct ?? 0} / {entry.test?.total ?? 0}
    //             </p>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   ))}

    //   {filteredData.length === 0 && (
    //     <p className="text-center text-gray-400">
    //       Bu sana uchun hech qanday statistika topilmadi.
    //     </p>
    //   )}
    // </div>
    <>
      <div className="container mt-10">
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-white space-y-5">
          <h3 className="text-2xl font-bold text-center text-yellow-600 flex items-center justify-center gap-2 ">
            <ChartArea size={40}/> Umumiy statistika
          </h3>

          <div className="flex justify-between items-center bg-amber-400/10 border border-amber-400/30 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 text-amber-300">
              <BookText className="w-5 h-5" />
              <p className="font-medium">Lug'at</p>
            </div>
            <p className="text-white font-semibold">
              {summary.vocabulary.correct} / {summary.vocabulary.total}
            </p>
          </div>

          <div className="flex justify-between items-center bg-rose-400/10 border border-rose-400/30 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 text-rose-300">
              <HelpCircle className="w-5 h-5" />
              <p className="font-medium">Savollar</p>
            </div>
            <p className="text-white font-semibold">
              {summary.quiz.correct} / {summary.quiz.total}
            </p>
          </div>

          <div className="flex justify-between items-center bg-emerald-400/10 border border-emerald-400/30 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 text-emerald-300">
              <ClipboardCheck className="w-5 h-5" />
              <p className="font-medium">Test</p>
            </div>
            <p className="text-white font-semibold">
              {summary.test.correct} / {summary.test.total}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyStats;
