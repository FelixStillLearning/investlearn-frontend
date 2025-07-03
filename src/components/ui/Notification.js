import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to your backend Socket.io server

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      socket.on('new_notification', (data) => {
        if (data.userId === user._id) {
          setNotifications((prev) => [...prev, data.message]);
          setTimeout(() => {
            setNotifications((prev) => prev.slice(1)); // Remove after 5 seconds
          }, 5000);
        }
      });
    }

    return () => {
      socket.off('new_notification');
    };
  }, [user]);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((msg, index) => (
        <div
          key={index}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out"
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

export default Notification;