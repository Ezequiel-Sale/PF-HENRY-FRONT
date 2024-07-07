"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
} from "react";
import io from "socket.io-client";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (newNotification: Omit<Notification, "id" | "read">) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("register", "userId"); // Reemplaza 'userId' con el ID real del usuario
    });

    socket.on("newNotification", (notification) => {
      addNotification({ message: notification.message });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addNotification = (
    newNotification: Omit<Notification, "id" | "read">
  ) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now(),
      read: false,
    };
    setNotifications((prev) => [...prev, notification]);
    const updatedNotifications = [...notifications, notification];
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const removeNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
  setNotifications(updatedNotifications);

  // Guarda en localStorage
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
  
    // Guarda en localStorage
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        unreadCount,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification debe ser usado dentro de un NotificationProvider"
    );
  }
  return context;
};
