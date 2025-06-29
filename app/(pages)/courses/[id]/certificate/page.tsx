"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import api from "@/app/api/service/api";

type Question = {
  id: string;
  type: "word" | "quiz";
  question: string;
  correctAnswer: string;
  options: string[];
};

const CertificateTestPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const userId = "123";

  useEffect(() => {
    api
      .get(`/certificate/test/${id}`)
      .then((res) => setQuestions(res.data));
  }, [id]);

  const handleAnswer = (qid: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: answer }));
  };

  const handleSubmit = async () => {
    const result = questions.map((q) => ({
      type: q.type,
      isCorrect: answers[q.id] === q.correctAnswer ? 1 : 0,
    }));

    await axios.post("/certificate/submit", {
      userId,
      id,
      answers: result,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Kurs Yakuniy Testi</h1>
      {questions.map((q, idx) => (
        <div key={q.id} className="border p-3 rounded-xl shadow">
          <p className="font-semibold">{idx + 1}. {q.question}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(q.id, opt)}
                className={`px-3 py-2 rounded border ${
                  answers[q.id] === opt ? "bg-blue-500 text-white" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Yuborish
        </button>
      )}

      {submitted && <p className="text-green-600 font-bold">✅ Sertifikat olindi!</p>}
    </div>
  );
};

export default CertificateTestPage;
