"use client";
import { useState } from "react";
import { updateUser } from "@/app/api/service/api";
import { useSession } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface User {
    id: string;
  }
}

const PasswordChanger = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const handleChangePassword = async () => {
    if (!session?.user?.id) {
      setMessage("Foydalanuvchi aniqlanmadi");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Yangi parollar bir xil emas");
      return;
    }

    try {
      await updateUser(session.user.id, {
        currentPassword,
        password: newPassword,
      });
      setMessage("✅ Parol muvaffaqiyatli yangilandi");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setMessage("❌ " + (e?.response?.data?.message || "Xatolik yuz berdi"));
    }
  };

  return (
    <div className="bg-white/10 p-6 mt-10 rounded-xl space-y-4 max-w-md">
      <h2 className="text-xl font-bold text-white">🔐 Parolni o‘zgartirish</h2>

      <input
        type="password"
        placeholder="Hozirgi parol"
        className="w-full px-4 py-2 rounded bg-white/10 text-white border border-gray-500"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Yangi parol"
        className="w-full px-4 py-2 rounded bg-white/10 text-white border border-gray-500"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Yangi parol (takroran)"
        className="w-full px-4 py-2 rounded bg-white/10 text-white border border-gray-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleChangePassword}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Parolni yangilash
      </button>

      {message && <p className="text-yellow-300">{message}</p>}
    </div>
  );
};

export default PasswordChanger;
