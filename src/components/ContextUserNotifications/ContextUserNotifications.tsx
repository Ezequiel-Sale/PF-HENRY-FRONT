"use client";
import React, { createContext, useContext, useState, useEffect, FC } from "react";
import io from "socket.io-client";
import { userSession } from "@/types/profesorInterface";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export interface Anuncio {
  id: number;
  message: string;
}

interface CombinedContextType {
  notifications: Notification[];
  addNotification: (newNotification: Omit<Notification, "id" | "read">) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
  removeNotification: (id: number) => void;
  userData: userSession | null;
  setUserData: (user: userSession | null) => void;
  addAnuncio: (newAnuncio: Omit<Anuncio, "id">) => void;
  anuncio: Anuncio | null;
}

const CombinedContext = createContext<CombinedContextType | undefined>(undefined);

export const CombinedProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [userData, setUserData] = useState<userSession | null>(null);

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
      const storedAnuncio = localStorage.getItem('anuncio');
      if (storedAnuncio) {
        setAnuncio(JSON.parse(storedAnuncio));
      }
    } else {
      console.warn('localStorage is not available');
    }
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      if (userData) {
        socket.emit("register", userData.id);
      }
    });

    socket.on("newNotification", (notification) => {
      addNotification({ message: notification.message });
    });

    return () => {
      socket.disconnect();
    };
  }, [userData]);

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

  const addAnuncio = (newAnuncio: Omit<Anuncio, "id">) => {
    const anuncioObj: Anuncio = {
      ...newAnuncio,
      id: Date.now(),
    };
    setAnuncio(anuncioObj);
    localStorage.setItem("anuncio", JSON.stringify(anuncioObj));
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

  useEffect(() => {
    if (anuncio) {
      const timeoutId = setTimeout(() => {
        setAnuncio(null);
        localStorage.removeItem("anuncio");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [anuncio]);

  return (
    <CombinedContext.Provider
      value={{
        notifications,
        addNotification,
        addAnuncio,
        markAsRead,
        unreadCount,
        removeNotification,
        userData,
        setUserData,
        anuncio,
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
