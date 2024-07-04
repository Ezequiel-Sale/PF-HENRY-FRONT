import React, { FC, useEffect } from 'react';
import { useNotification, Notification } from '../NotificationContext/NotificationContext';

const NotificationsDropdown: FC = () => {
  const { notifications, markAsRead } = useNotification();

  useEffect(() => {
    notifications.forEach(notif => {
      if (!notif.read) {
        markAsRead(notif.id);
      }
    });
  }, [notifications, markAsRead]);

  return (
    <div className="notifications-dropdown bg-white rounded-md shadow-lg">
      <h3 className="text-lg font-semibold p-3 border-b">Notificaciones</h3>
      <div className="overflow-y-auto max-h-[300px]">
        {notifications.length === 0 ? (
          <p className="p-3 text-gray-500">No tienes notificaciones</p>
        ) : (
          notifications.map((notification: Notification) => (
            <div 
              key={notification.id} 
              className={`notification p-3 border-b ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
            >
              <p className="text-black">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;