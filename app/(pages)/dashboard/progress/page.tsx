"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, BookText, HelpCircle, ClipboardCheck } from "lucide-react";
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

  // Faqat tanlangan sanaga mos datalarni filter qiladi
  const filteredData = filterDate
    ? data.filter((entry) => entry.date === filterDate)
    : data;

  if (loading) return <div className="text-white text-center py-10">Yuklanmoqda...</div>;

  return (
    <div className="container text-white pt-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">📅 Har kunlik faoliyat</h2>

      <div className="mb-6">
        <label className="block mb-2 text-sm text-gray-300">Kunni tanlang:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded w-full"
        />
      </div>

      {filteredData.map((entry) => (
        <div
          key={entry.date}
          className="rounded-xl border border-gray-500/30 bg-gray-500/10 px-5 py-4 shadow"
        >
          <button
            className="flex items-center justify-between w-full text-left"
            onClick={() => setExpanded(expanded === entry.date ? null : entry.date)}
          >
            <span className="text-lg font-medium">{entry.date}</span>
            {expanded === entry.date ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expanded === entry.date && (
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center text-amber-400">
                <div className="flex items-center gap-3">
                  <BookText /> <p>Lug'at</p>
                </div>
                <p>{entry.vocabulary?.correct ?? 0} / {entry.vocabulary?.total ?? 0}</p>
              </div>

              <div className="flex justify-between items-center text-rose-400">
                <div className="flex items-center gap-3">
                  <HelpCircle /> <p>Savollar</p>
                </div>
                <p>{entry.quiz?.correct ?? 0} / {entry.quiz?.total ?? 0}</p>
              </div>

              <div className="flex justify-between items-center text-emerald-400">
                <div className="flex items-center gap-3">
                  <ClipboardCheck /> <p>Test</p>
                </div>
                <p>{entry.test?.correct ?? 0} / {entry.test?.total ?? 0}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {filteredData.length === 0 && (
        <p className="text-center text-gray-400">Bu sana uchun hech qanday statistika topilmadi.</p>
      )}
    </div>
  );
};

export default DailyStats;
