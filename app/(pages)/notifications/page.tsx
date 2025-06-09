"use client"

import { getMe, markNotificationAsRead } from "@/app/api/service/api"
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react"

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

interface UserResponse {
  notifications: UserNotification[];
  user: { id: string };
}


const page = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    getMe().then((e: UserResponse) => {
      setNotifications(e.notifications)

      e.notifications.forEach(notification => {
        if (!notification.isRead) {
          markNotificationAsRead(notification.id);
        }
      });
    })

  }, [])

  return (
    <section className="container pt-5">
      {notifications.map((habar, index) => {
        const timeOnly = new Date(habar.notification.sentAt).toLocaleTimeString('uz-UZ', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return (
          <div key={index} className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-white relative mb-4">
            <InfoIcon className="absolute right-2.5 top-2.5" />
            <h1 className="robo-light text-base">{habar.notification.title}</h1>
            <p className="mb-2">{habar.notification.message}</p>
            <span className="robo-light text-xs absolute bottom-1 right-5">{timeOnly}</span>
          </div>)
      })}

    </section>
  )
}

export default page