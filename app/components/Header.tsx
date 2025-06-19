"use client";
import {
  BellRing,
  ChartArea,
  CircleUserIcon,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe } from "../api/service/api";
import logo from "@/app/images/7edu white logo.png";
import Link from "next/link";
import Image from "next/image";

interface NotificationContent {
  title: string;
  message: string;
  sentAt: string;
}

interface UserNotification {
  id: string;
  userId: string;
  notificationId: string;
  isRead: boolean;
  notification: NotificationContent;
}

const Header = () => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [userId, setId] = useState("");

  useEffect(() => {
    getMe().then((e) => {
      setId(e.id);
      setNotifications(e.notifications);
    });
  }, []);

  const navLinks = [
    { href: `/user/${userId}`, icon: Home, label: "Home" },
    { href: "/courses", icon: LayoutDashboard, label: "Courses" },
    { href: "/dashboard", icon: ChartArea, label: "Dashboard" },
    { href: "/notifications", icon: BellRing, label: "Notifications" },
    { href: "/user/profile", icon: CircleUserIcon, label: "Profile" },
  ];

  return (
    <header className="w-full z-50 px-1.5 pt-2 xl:block max-md:hidden">
      <div className="container bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-xl px-2 py-2 mx-auto flex items-center justify-between shadow-md">
        <Link href={`/user/${userId}`} className="flex items-center gap-2">
          <Image alt="logo" src={logo} className="w-16 object-cover" />
        </Link>
        <ul className="flex items-center gap-4 text-sm font-medium">
          {navLinks.map(({ href, icon: Icon, label }, index) => {
            const isActive = pathname === href;
            return (
              <li
                key={index}
                className={`${
                  isActive ? "text-white" : "text-white/60"
                } hover:text-white transition`}
              >
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
