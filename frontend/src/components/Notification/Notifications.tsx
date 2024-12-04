import React, { useState, useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import NotifSound from "../../../public/sounds/notification_sound.mp3";

const Notifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<{
    medicineName: string;
    time: string;
  } | null>(null);

  const playNotificationSound = () => {
    const audio = new Audio(NotifSound); // Use the imported sound file
    audio
      .play()
      .catch((error) => console.error("Audio playback failed:", error));
  };

  const fetchNotifications = async () => {
    const db = getFirestore();
    const medicationsRef = collection(
      db,
      "Users",
      "userId_0001",
      "Medications"
    ); // Collection reference

    try {
      const querySnapshot = await getDocs(medicationsRef);

      const now = new Date();
      const currentDate = now.toLocaleDateString("en-CA"); // Outputs YYYY-MM-DD in local timezone
      const currentTime = now.toLocaleTimeString("en-GB", { hour12: false }); // Outputs HH:MM:SS in local timezone

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const notifications = data.notifications;
        if (notifications) {
          const dueNotification = notifications.find(
            (notif: any) =>
              notif.date === currentDate &&
              notif.time === currentTime &&
              !notif.isTaken &&
              !notif.isMissed
          );

          if (dueNotification) {
            const [hours, minutes, seconds] = dueNotification.time
              .split(":")
              .map(Number);
            const localTime = new Date();
            localTime.setHours(hours, minutes, seconds);

            const formattedTime = localTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            setCurrentNotification({
              medicineName: data.medicineName,
              time: formattedTime,
            });

            // Play the notification sound
            playNotificationSound();
          }
        }
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      {currentNotification && (
        <NotificationCard
          medicineName={currentNotification.medicineName}
          time={currentNotification.time}
          onClose={() => setCurrentNotification(null)}
        />
      )}
    </div>
  );
};

export default Notifications;
