import React from 'react';
import { useContextCombined } from '../ContextUserNotifications/ContextUserNotifications';

const NotificationsDropdown = () => {
  const { 
    notifications, 
    markAsRead, 
    removeNotification,
    unreadCount 
  } = useContextCombined();

  return (
    <div className="notifications-dropdown">
      <h4>Notifications ({unreadCount})</h4>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <div>
              <p>{notification.message}</p>
              {!notification.read && (
                <button onClick={() => markAsRead(notification.id)}>
                  Mark as Read
                </button>
              )}
              <button onClick={() => removeNotification(notification.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsDropdown;


  // useEffect(() => {
  //   if (!userData?.id) return;

  //   const socket = io('http://localhost:3001', {
  //     query: { userId: userData.id },
  //     withCredentials: true,
  //   });

  //   socket.on('Tu profe ha subido tu rutina', (message: string) => {
  //     addNotification({ message });
  //   });

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server notifications');
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket server');
  //   });

  //   socket.on('error', (error: any) => {
  //     console.error('WebSocket error:', error);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [userData?.id, addNotification]);