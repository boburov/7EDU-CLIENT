"use client";
import { useEffect, useState } from "react";
import { getMe, updateUser } from "@/app/api/service/api";
import { CheckSquare, Lock, Square } from "lucide-react";

const PasswordChanger = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("password");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUserId(data.id);
      } catch {
        setMessage("Foydalanuvchini aniqlab bo‘lmadi.");
      }
    };

    fetchUser();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setMessage("Paroll bo'sh bo'lmasligi kerak");
      return;
    }

    if (!userId) {
      setMessage("Foydalanuvchi aniqlanmadi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Yangi parollar mos emas.");
      return;
    }

    try {
      await updateUser(userId, { password: newPassword });
      setMessage("Parol yangilandi. Emailga xabar yuborildi.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("Xatolik: " + err.message);
      } else {
        setMessage("Parolni o‘zgartirib bo‘lmadi.");
      }
    }
  };

  return (
    <div className="container flex flex-col gap-4 pt-5">
      <h2 className="text-xl font-bold text-white flex items-center gap-3">
        <Lock /> Parolni o‘zgartirish
      </h2>

      <input
        type={type}
        placeholder="Yangi parol"
        className="w-full px-4 py-3 rounded bg-white/10 text-white border border-gray-500"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type={type}
        placeholder="Yangi parol (takroran)"
        className="w-full px-4 py-3 rounded bg-white/10 text-white border border-gray-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <span className="flex items-center gap-3 text-white">
        {type === "text" ? (
          <CheckSquare onClick={() => setType("password")} className="cursor-pointer" />
        ) : (
          <Square onClick={() => setType("text")} className="cursor-pointer" />
        )}
        <p>{type === "password" ? "ko'rish" : "berkitish"}</p>
      </span>

      <button
        onClick={handleChangePassword}
        className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-white px-4 py-3 rounded w-full"
      >
        Parolni yangilash
      </button>

      {message && <p className="text-amber-300">{message}</p>}
    </div>
  );
};

export default PasswordChanger;
