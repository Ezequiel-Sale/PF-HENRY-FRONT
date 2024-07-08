import React, { FC, useEffect, useState } from 'react';
import { Notification, useContextCombined } from '../ContextUserNotifications/ContextUserNotifications';
// import { getNotifications } from '@/helper/petitions';

const NotificationsDropdown: FC = () => {
  const { notifications, markAsRead, removeNotification } = useContextCombined();
  const [Notificaciones, setNotificaciones] = useState<Notification[]>([]);


  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const data = await getNotifications();
  //       setNotificaciones(data);
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchNotifications();
  // },[])

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
              className={`notification relative p-3 border-b ${notification.read ? 'bg-gray-300' : 'bg-white'}`}
            >
                <button onClick={() => removeNotification(notification.id)} className="absolute top-0 right-3">x</button>
              <p className="text-black font-sans">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;
