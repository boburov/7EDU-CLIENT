"use client";
import { useEffect, useState } from "react";
import { CalendarDays, CalendarCheck, BarChart3 } from "lucide-react";
import api from "@/app/api/service/api";

const Page = () => {
  const [missed, setMissed] = useState({
    week: 0,
    month: 0,
    fourMonths: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user/user-activity")
      .then((res) => {
        const watchedDates = res.data?.showedLessons?.map((item: any) => new Date(item.watchedAt)) || [];
        const createdAt = new Date(res.data?.createdAt);

        calculateMissedDays(watchedDates, createdAt);
      })
      .catch((err) => {
        console.error("Davomatni olishda xatolik:", err);
        setMissed({ week: 0, month: 0, fourMonths: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  const calculateMissedDays = (watched: Date[], createdAt: Date) => {
    const today = new Date();

    const dateDiffInDays = (a: Date, b: Date) =>
      Math.floor((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));

    const totalDays = dateDiffInDays(today, createdAt);

    const missedDays = {
      week: 0,
      month: 0,
      fourMonths: 0,
    };

    for (let i = 0; i <= totalDays; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);

      const isWatched = watched.some(
        (d) =>
          d.getFullYear() === checkDate.getFullYear() &&
          d.getMonth() === checkDate.getMonth() &&
          d.getDate() === checkDate.getDate()
      );

      if (!isWatched) {
        if (i < 7) missedDays.week++;
        if (i < 30) missedDays.month++;
        if (i < 120) missedDays.fourMonths++;
      }
    }

    setMissed(missedDays);
  };

  return (
    <div className="container text-white space-y-6 pt-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold flex items-center gap-3 text-center w-full">
        O&apos;quvchining Davomat Qismi
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Yuklanmoqda...</p>
      ) : (
        <>
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
              <p className="text-xl font-medium">Oyda</p>
              <p className="text-lg text-white/70">{missed.month} kun qoldirilgan</p>
            </div>
          </div>

          <div className="flex items-center gap-5 w-full rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 px-6 py-5 shadow">
            <BarChart3 className="text-sky-400" size={42} strokeWidth={1.5} />
            <div className="flex flex-col">
              <p className="text-xl font-medium">4 Oyda</p>
              <p className="text-lg text-white/70">{missed.fourMonths} kun qoldirilgan</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
