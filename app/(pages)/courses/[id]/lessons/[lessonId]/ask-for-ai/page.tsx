"use client";

import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api, { getMe, sendrequestForAI } from "@/app/api/service/api";

type Message = {
  role: "user" | "ai";
  text: string;
};

const ChatWidget = () => {
  const { lessonId } = useParams() as { lessonId: string };
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [credit, setCredit] = useState<number>(10);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const me = await getMe();
      setUserId(me.id);
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

    const newUserMessage: Message = { role: "user", text: message };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setMessage("");

    try {
      const data = await sendrequestForAI(lessonId, message);
      const newAIMessage: Message = { role: "ai", text: data.answer };
      setMessages((prev) => [...prev, newAIMessage]);
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
      <div className="p-3 bg-[#1f1f1f] rounded-t-xl border border-[#3f3f3f] text-white max-h-[70vh] overflow-y-auto space-y-3">
        <div className="text-sm mb-2 text-gray-400">
          {userId ? `AI kredit: ${credit}/10` : "Yuklanmoqda..."}
        </div>

        <div className="flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${msg.role === "user"
                ? "bg-blue-500 self-end text-white"
                : "bg-gray-700 self-start text-green-400"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
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
      </div>
    </div>
  );
};

export default ChatWidget;
