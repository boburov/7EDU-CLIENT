"use client";

import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import api, { getMe } from "@/app/api/service/api";

const ChatWidget = () => {
  const { lessonId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [credit, setCredit] = useState<number>(10);
  const [userId, setUserId] = useState<string | null>(null);


  const fetchUser = async () => {
    try {
      const res = await getMe().then((e) => {
        setUserId(e.id);
      })
    } catch (err) {
      console.error("Foydalanuvchini olishda xatolik:", err);
    }
  };


  const fetchCredit = async (uid: string) => {
    try {
      const res = await api.get(`/user/ai-usage?userId=${uid}&lessonId=${lessonId}`);
      setCredit(10 - res.data.count);
    } catch (err) {
      console.error("Kreditni olishda xatolik:", err);
    }
  };


  const sendMessage = async () => {
    if (!message.trim() || loading || credit <= 0 || !userId) return;
    setLoading(true);
    try {
      const res = await api.post("user/chat", {
        lessonId,
        message,
      });
      setResponse(res.data.answer);
      setMessage("");
      fetchCredit(userId);
    } catch (err: any) {
      alert(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId && lessonId) {
      fetchCredit(userId);
    }
  }, [userId, lessonId]);

  return (
    <div className="fixed bottom-[90px] right-2 z-50 w-[96%] max-w-[500px] shadow-2xl">
      <div className="p-3 bg-[#1f1f1f] rounded-t-xl border border-[#3f3f3f] text-white">
        <div className="text-sm mb-2 text-gray-400">
          {userId ? `AI kredit: ${credit}/10` : "Yuklanmoqda..."}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="AI ga xabar yozing..."
            className="flex-grow h-12 rounded-lg px-3 bg-[#2d2d2d] text-white border border-[#3f3f3f] focus:outline-none focus:border-[#6e6e6e]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading || credit <= 0 || !userId}
          />
          <button
            onClick={sendMessage}
            disabled={loading || credit <= 0 || !userId}
            className="p-3 rounded-lg bg-[#3a3a3a] hover:bg-[#4b4b4b] disabled:opacity-50 transition"
          >
            <Send size={20} color="white" />
          </button>
        </div>
        {response && (
          <div className="mt-4 text-sm text-green-400 whitespace-pre-wrap">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
