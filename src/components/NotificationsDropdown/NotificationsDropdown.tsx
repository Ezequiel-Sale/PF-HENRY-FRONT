"use client";
import React, { useEffect, useState } from 'react';
import { useContextCombined } from '../ContextUserNotifications/ContextUserNotifications';
import { useRouter } from 'next/navigation';
import { userSession } from '@/types/profesorInterface';

const NotificationsDropdown = () => {
  const { 
    notifications, 
    markAsRead, 
    removeNotification,
    unreadCount 
  } = useContextCombined();
  const router = useRouter();
  const [userData, setUserData] = useState<userSession>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userSession");
      setUserData(JSON.parse(userData!));
    }
  }, []);

  return (
    <div className="relative">
      <div className="notifications-dropdown bg-white rounded-lg shadow-lg p-4 w-80">
        <h4 className="text-lg font-semibold mb-3">Notificaciones ({unreadCount})</h4>
        <ul className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.map(notification => (
            <li key={notification.id} className="pt-2 pl-2 pr-2 pb-4 border rounded-lg bg-gray-50 hover:bg-gray-100">
              <div className="relative flex justify-between items-start">
                <p className="text-sm text-gray-800">{notification.message}</p>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)} 
                      className="absolute bottom-[-14px] left-0 text-xs text-blue-600 hover:underline"
                    >
                      Marcar como leido
                    </button>
                  )}
                  <div className='flex flex-col'>
                    {userData?.role === "user" && <button onClick={() => router.push("/userdashboard/rutina")}>ver</button>}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsDropdown;