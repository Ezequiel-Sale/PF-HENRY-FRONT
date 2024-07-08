"use client";
import React, { createContext, useContext, useState, useEffect, FC } from "react";
import io from "socket.io-client";
import { getUsers } from "@/helper/petitions";
import { User } from "@/app/dashboard/users/page";
import { userSession } from "@/types/profesorInterface";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface CombinedContextType {
  notifications: Notification[];
  addNotification: (newNotification: Omit<Notification, "id" | "read">) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
  removeNotification: (id: number) => void;
  userData: userSession | null;
  setUserData: (user: userSession | null) => void;
}

const CombinedContext = createContext<CombinedContextType | undefined>(undefined);

export const CombinedProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userData, setUserData] = useState<userSession | null>(null);
  console.log("userData en context",userData)

  //   Load userData from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userDataString = localStorage.getItem("userSession");
      setUserData(JSON.parse(userDataString as string));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedNotifications = localStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } else {
      console.warn('localStorage is not available');
    }
  }, []);

  // WebSocket connection
  useEffect(() => {
    const socket = io("http://localhost:3001", {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      if (userData) {
        socket.emit("register", userData.id); // Ajuste para usar userData.id
      }
    });

    socket.on("newNotification", (notification) => {
      addNotification({ message: notification.message });
    });

    return () => {
      socket.disconnect();
    };
  }, [userData]); // Ajuste para depender de userData

  // Handle notifications
  const addNotification = (newNotification: Omit<Notification, "id" | "read">) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now(),
      read: false,
    };
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const removeNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;



  // Listen for changes in localStorage to update userData
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const userDataString = localStorage.getItem("userSession");
//       setUserData(JSON.parse(userDataString as string));
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

  return (
    <CombinedContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        unreadCount,
        removeNotification,
        userData,
        setUserData,
      }}
    >
      {children}
    </CombinedContext.Provider>
  );
};

export const useContextCombined = (): CombinedContextType => {
  const context = useContext(CombinedContext);
  if (!context) {
    throw new Error("useContextCombined debe ser usado dentro de un CombinedProvider");
  }
  return context;
};
