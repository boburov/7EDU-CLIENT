"use client";
import { useEffect, useState } from "react";
import { CalendarDays, CalendarCheck, BarChart3, ListChecks } from "lucide-react";
import api, { getMe } from "@/app/api/service/api";

const Page = () => {
  const [missed, setMissed] = useState({
    week: 0,
    month: 0,
    fourMonths: 0,
  });
  const [missedDates, setMissedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  function countMissedDays(startDateStr: string, endDateStr: string, watchedList: string[]) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const watchedSet = new Set(watchedList);
    const missed: string[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      if (!watchedSet.has(dateStr)) {
        missed.push(dateStr);
      }
    }

    const today = new Date();
    const normalize = (n: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() - n);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const weekAgo = normalize(6);
    const monthAgo = normalize(29);
    const fourMonthsAgo = normalize(119);

    const week = missed.filter(date => new Date(date) >= weekAgo).length;
    const month = missed.filter(date => new Date(date) >= monthAgo).length;
    const fourMonths = missed.filter(date => new Date(date) >= fourMonthsAgo).length;

    return {
      missedDates: missed,
      countByRange: { week, month, fourMonths }
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getMe();
        if (!user) throw new Error("User not found");

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        // TODO: Replace with real watched lesson dates from user.showedLesson
        const watchedDates = user.showedLesson?.map((l: any) =>
          l.watchedAt.substring(0, 10)
        ) || [];

        const { missedDates, countByRange } = countMissedDays(
          user.createdAt.substring(0, 10),
          todayStr,
          watchedDates
        );

        setMissed(countByRange);
        setMissedDates(missedDates);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container text-white space-y-6 pt-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold flex items-center gap-3 text-center w-full">
        O&apos;quvchining Davomat Qismi
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Yuklanmoqda...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-5 w-full rounded-xl border border-gray-400/30 bg-gray-500/10 text-gray-300 px-6 py-5 shadow">
              <CalendarDays className="text-gray-300" size={42} strokeWidth={1.5} />
              <div className="flex flex-col">
                <p className="text-xl font-medium">Haftalik</p>
                <p className="text-lg text-white/70">{missed.week} kun qoldirilgan</p>
              </div>
            </div>

            <div className="flex items-center gap-5 w-full rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 px-6 py-5 shadow">
              <CalendarCheck className="text-yellow-400" size={42} strokeWidth={1.5} />
              <div className="flex flex-col">
                <p className="text-xl font-medium">Oylik</p>
                <p className="text-lg text-white/70">{missed.month} kun qoldirilgan</p>
              </div>
            </div>

            <div className="flex items-center gap-5 w-full rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 px-6 py-5 shadow">
              <BarChart3 className="text-sky-400" size={42} strokeWidth={1.5} />
              <div className="flex flex-col">
                <p className="text-xl font-medium">So‘nggi 4 Oy</p>
                <p className="text-lg text-white/70">{missed.fourMonths} kun qoldirilgan</p>
              </div>
            </div>
          </div>

          
        </>
      )}
    </div>
  );
};

export default Page;
