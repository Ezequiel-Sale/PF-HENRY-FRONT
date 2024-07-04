"use client";
import React, { createContext, useContext, useState, FC } from 'react';

export interface Notification {
  id: number;
  message: string;
  read: boolean; // Añadimos esta propiedad
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (newNotification: Omit<Notification, 'id' | 'read'>) => void;
  markAsRead: (id: number) => void;
  unreadCount: number; // Añadimos esta propiedad
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (newNotification: Omit<Notification, 'id' | 'read'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now(),
      read: false,
    };
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  return context;
};