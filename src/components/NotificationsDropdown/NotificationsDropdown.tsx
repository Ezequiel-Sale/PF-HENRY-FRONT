import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useContextCombined } from '../ContextUserNotifications/ContextUserNotifications';

const NotificationsDropdown = () => {
  const { 
    notifications, 
    addNotification, 
    markAsRead, 
    removeNotification,
    userData 
  } = useContextCombined();

  useEffect(() => {
    if (!userData?.id) return;

    const socket = io('http://localhost:3001', {
      query: { userId: userData.id },
      withCredentials: true,
    });

    socket.on('Tu profe ha subido tu rutina', (message: string) => {
      addNotification({ message });
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server notifications');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userData?.id, addNotification]);

  return (
    <div className="notifications-dropdown bg-white rounded-md shadow-lg">
      <h3 className="text-lg font-semibold p-3 border-b">Notificaciones</h3>
      <div className="overflow-y-auto max-h-[300px]">
        {notifications.length === 0 ? (
          <p className="p-3 text-gray-500">No tienes notificaciones</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification relative p-3 border-b ${notification.read ? 'bg-gray-100' : ''}`}
            >
              <p className="text-black font-sans">{notification.message}</p>
              {!notification.read && (
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-500 text-sm"
                >
                  Marcar como leída
                </button>
              )}
              <button 
                onClick={() => removeNotification(notification.id)}
                className="text-red-500 text-sm ml-2"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;