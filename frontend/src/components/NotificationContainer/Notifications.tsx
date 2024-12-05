import React, { useState, useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import NotifSound from "../../sounds/notification_sound.mp3";

interface Notification {
  date: string;
  time: string;
  isTaken: boolean;
  isMissed: boolean;
  medicineName?: string; // Include the medicine name for context
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<{
    medicineName: string;
    time: string;
  } | null>(null);
  const [processedNotifications, setProcessedNotifications] = useState<
    Set<string>
  >(new Set());

  const playNotificationSound = () => {
    const audio = new Audio(NotifSound);
    audio
      .play()
      .catch((error) => console.error("Audio playback failed:", error));
  };

  const fetchNotifications = () => {
    // console.log("Fetching notifications from Firestore...");
    const db = getFirestore();
    const medicationsRef = collection(
      db,
      "Users",
      "userId_0001",
      "Medications"
    );

    // Use Firestore onSnapshot for real-time updates
    onSnapshot(medicationsRef, (querySnapshot) => {
      const fetchedNotifications: Notification[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // console.log("Document data:", data);

        if (data.notifications) {
          fetchedNotifications.push(
            ...data.notifications.map((notif: Notification) => ({
              ...notif,
              medicineName: data.medicineName, // Include medicine name for context
            }))
          );
        }
      });

      // console.log("Fetched notifications:", fetchedNotifications);
      setNotifications(fetchedNotifications);
    });
  };

  const checkAndTriggerNotifications = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const currentTime = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS

    // console.log(`Checking notifications at ${currentDate} ${currentTime}...`);

    notifications.forEach((notif) => {
      const notifKey = `${notif.date}-${notif.time}`; // Unique key for each notification

      if (
        notif.date === currentDate &&
        notif.time === currentTime &&
        !notif.isTaken &&
        !notif.isMissed &&
        !processedNotifications.has(notifKey) // Avoid duplicate processing
      ) {
        // console.log("Triggering notification:", notif);

        const [hours, minutes, seconds] = notif.time.split(":").map(Number);
        const notifTime = new Date();
        notifTime.setHours(hours, minutes, seconds);

        const formattedTime = notifTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        setCurrentNotification({
          medicineName: notif.medicineName || "Unknown Medicine",
          time: formattedTime,
        });

        playNotificationSound();
        setProcessedNotifications((prev) => new Set(prev).add(notifKey));
      }
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    // Check notifications every minute
    const interval = setInterval(() => {
      checkAndTriggerNotifications();
    }, 1000); // Run every minute

    return () => clearInterval(interval); // Cleanup interval
  }, [notifications, processedNotifications]);

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
