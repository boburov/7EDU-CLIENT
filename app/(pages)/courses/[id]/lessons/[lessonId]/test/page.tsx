"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, FileX, RefreshCcw, XCircle } from "lucide-react";
import api from "@/app/api/service/api";
import confetti from "canvas-confetti";

interface OneTest {
  word: string;
  correct: string;
  options: string[];
}

export default function TestPage() {
  const path = useParams();
  const lessonId = path.lessonId;
  const [index, setIndex] = useState(0);
  const [tests, setTests] = useState<OneTest[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const stayback = useRouter()

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 0, y: 0.6 },
    });
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 1, y: 0.6 },
    });
  };

  useEffect(() => {
    if (finished && results.every((r) => r === true)) {
      launchConfetti();
    }
  }, [finished, results]);


  useEffect(() => {
    api.get(`/courses/${lessonId}/vocabulary-quiz`).then((res) => {
      setTests(res.data);
    });
  }, [lessonId]);

  const current = tests[index];

  const handleAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    const isCorrect = answer === current.correct;
    setResults((prev) => [...prev, isCorrect]);

    setTimeout(() => {
      if (index + 1 >= tests.length) {
        setFinished(true);
        api.post(`/courses/${lessonId}/vocabulary-result`, {
          total: tests.length,
          correct: [...results, isCorrect].filter(Boolean).length,
          wrong: tests.length - [...results, isCorrect].filter(Boolean).length,
        });
      } else {
        setIndex(index + 1);
        setSelected(null);
      }
    }, 1000);
  };

  if (!current) return <div className="mt-10 container scale-75 py-10 border border-white/10 rounded-2xl bg-white/5 shadow-2xl backdrop-blur-md text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full border border-white/20 shadow-inner">
              <FileX size={32} className="text-red-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">Testlar topilmadi</h2>
          <p className="text-gray-300 text-sm mb-6">
            Ushbu dars uchun hozircha hech qanday test savollari mavjud emas. Admin tomonidan hali kiritilmagan bo‘lishi mumkin.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition text-sm text-white"
          >
            <RefreshCcw size={18} />
            Qayta yuklash
          </button>
        </div>;

  return (
    <div className="flex justify-center items-center h-[60vh] px-4">
      <div className="w-full max-w-xl bg-[#1f1f1f]/60 backdrop-blur-3xl border border-[#0e0c0c] text-white p-6 rounded-2xl shadow-lg space-y-5">
        {finished ? (
          <div className="text-center space-y-4">
            <CheckCircle2 size={48} className="mx-auto text-green-500" />
            <h2 className="text-2xl font-bold">Natijangiz</h2>
            <p>
              {results.filter(Boolean).length} / {tests.length} to‘g‘ri javob
            </p>
            <span onClick={() => { stayback.back() }} className="px-7 py-3 bg-green-600 rounded-md cursor-pointer">Bosh Fahifaga qaytish</span>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold">
              So‘z #{index + 1} / {tests.length}: <span className="text-yellow-400">{current.word}</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.options.map((opt, i) => {
                const isSelected = selected === opt;
                const isCorrect = selected && opt === current.correct;
                const isWrong = selected === opt && opt !== current.correct;

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className={`w-full py-3 px-4 rounded-xl border transition-all duration-200
                      ${isCorrect ? "border-green-500 bg-green-900/50" : ""}
                      ${isWrong ? "border-red-500 bg-red-900/50" : ""}
                      ${!isSelected && !isCorrect && !isWrong ? "border-neutral-600 hover:bg-neutral-800" : ""}
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {selected && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                {selected === current.correct ? (
                  <>
                    <CheckCircle2 className="text-green-500" size={20} />
                    To‘g‘ri javob
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500" size={20} />
                    Noto‘g‘ri. To‘g‘ri javob: <strong className="text-white">{current.correct}</strong>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}