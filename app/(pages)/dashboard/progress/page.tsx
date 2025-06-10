"use client";
import { BookText, HelpCircle, ClipboardCheck } from "lucide-react";

const page = () => {
  return (
    <div className="container pt-6 space-y-4 max-w-3xl mx-auto">

      <div className="flex items-center justify-between gap-4 w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-500 px-6 py-4 shadow">
        <div className="flex items-center gap-5">
          <BookText width={42} height={42} strokeWidth={1.5} />
          <p className="text-white text-lg font-semibold">{`Lug'at`}</p>
        </div>
        <span className="text-white/80 font-bold text-sm">30 / 100%</span>
      </div>

      <div className="flex items-center justify-between gap-4 w-full rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-500 px-6 py-4 shadow">
        <div className="flex items-center gap-5">
          <HelpCircle width={42} height={42} strokeWidth={1.5} />
          <p className="text-white text-lg font-semibold">Savollar</p>
        </div>
        <span className="text-white/80 font-bold text-sm">30 / 100%</span>
      </div>

      <div className="flex items-center justify-between gap-4 w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 px-6 py-4 shadow">
        <div className="flex items-center gap-5">
          <ClipboardCheck width={42} height={42} strokeWidth={1.5} />
          <p className="text-white text-lg font-semibold">Test</p>
        </div>
        <span className="text-white/80 font-bold text-sm">30 / 100%</span>
      </div>
    </div>
  );
};

export default page;
