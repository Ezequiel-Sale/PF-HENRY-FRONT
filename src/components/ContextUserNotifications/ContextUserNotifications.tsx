"use client"
import React, { createContext, useContext, useState, useEffect, FC } from "react";
import io from "socket.io-client";
import { userSession } from "@/types/profesorInterface";
import axios from "axios";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export interface Anuncio {
  id: string;
  message: string;
}

interface CombinedContextType {
  notifications: Notification[];
  addNotification: (newNotification: Omit<Notification, 'id' | 'read'>) => void;
  markAsRead: (id: string) => Promise<void>;
  unreadCount: number;
  removeNotification: (id: string) => void;
  userData: userSession | null;
  setUserData: (user: userSession | null) => void;
  addAnuncio: (newAnuncio: Omit<Anuncio, 'id'>) => void;
  anuncio: Anuncio | null;
}

const CombinedContext = createContext<CombinedContextType | undefined>(undefined);

export const CombinedProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [userData, setUserData] = useState<userSession | null>(null);
  const apiUri = process.env.NEXT_PUBLIC_API_URL;


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
    //   const storedAnuncio = localStorage.getItem('anuncio');
    //   if (storedAnuncio) {
    //     setAnuncio(JSON.parse(storedAnuncio));
    //   }
    // } else {
    //   console.warn('localStorage is not available');
    // }
    }
  }, []);

  const userId = userData?.id;

  // Recuperar notificaciones del backend
  useEffect(() => {
    if (userId) {
      axios.get(`${apiUri}/notifications/${userId}`)
        .then(response => {
          setNotifications(response.data);
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, [userId]);

  const addNotification = (newNotification: Omit<Notification, 'id' | 'read'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(), // Convertimos el id a string
      read: false,
    };
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  useEffect(() => {
    if (!userId) return;

    const socket = io(`${apiUri}`, {
      query: { userId },
      withCredentials: true,
    });

    socket.on('Tu profe ha subido tu rutina', (message: string) => {
      setNotifications(prevNotifications => [
        ...prevNotifications, 
        { id: Date.now().toString(), message, read: false }
      ]);
    });

    socket.on('newAnnouncement', (message: string) => {
      const anuncioObj: Anuncio = {
        id: Date.now().toString(),
        message,
      };
      setAnuncio(anuncioObj);
      localStorage.setItem('anuncio', JSON.stringify(anuncioObj));
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server context');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const addAnuncio = (newAnuncio: Omit<Anuncio, "id">) => {
    const anuncioObj: Anuncio = {
      ...newAnuncio,
      id: Date.now().toString(),
    };
    setAnuncio(anuncioObj);
    localStorage.setItem("anuncio", JSON.stringify(anuncioObj));
  };

  const removeNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`${apiUri}/notifications/${id}/read`);
      const updatedNotifications = notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  useEffect(() => {
    if (userId) {
      axios.get(`${apiUri}/avisos`)
        .then(response => {
          const lastAnuncio = response.data[response.data.length - 1];
          setAnuncio(lastAnuncio);
          localStorage.setItem('anuncio', JSON.stringify(lastAnuncio));
        })
        .catch(error => {
          console.error('Error fetching announcements:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (anuncio) {
      const timeoutId = setTimeout(() => {
        setAnuncio(null);
        localStorage.removeItem("anuncio");
      }, 86400000);
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
