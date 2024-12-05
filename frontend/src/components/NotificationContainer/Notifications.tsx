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
  lateTime?: string; // Add lateTime
  missedTime?: string; // Add missedTime
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<{
    medicineName: string;
    time: string;
    type: "normal" | "warning" | "missed";
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

  const addLateAndMissedTimes = (notif: Notification): Notification => {
    const [hours, minutes, seconds] = notif.time.split(":").map(Number);
    const notifTime = new Date();
    notifTime.setHours(hours, minutes, seconds);

    const lateTime = new Date(notifTime.getTime() + 5 * 60 * 1000);
    const missedTime = new Date(notifTime.getTime() + 15 * 60 * 1000);

    return {
      ...notif,
      lateTime: lateTime.toLocaleTimeString("en-GB", { hour12: false }),
      missedTime: missedTime.toLocaleTimeString("en-GB", { hour12: false }),
    };
  };

  const fetchNotifications = () => {
    console.log("Fetching notifications from Firestore...");
    const db = getFirestore();
    const medicationsRef = collection(
      db,
      "Users",
      "userId_0001",
      "Medications"
    );

    onSnapshot(medicationsRef, (querySnapshot) => {
      const fetchedNotifications: Notification[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.notifications) {
          fetchedNotifications.push(
            ...data.notifications.map((notif: Notification) =>
              addLateAndMissedTimes({
                ...notif,
                medicineName: data.medicineName, // Include medicine name for context
              })
            )
          );
        }
      });

      console.log(
        "Fetched notifications with lateTime and missedTime:",
        fetchedNotifications
      );

      setNotifications(fetchedNotifications);
    });
  };

  const checkAndTriggerNotifications = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const currentTime = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS

    notifications.forEach((notif) => {
      const notifKey = `${notif.date}-${notif.time}-${notif.lateTime}-${notif.missedTime}`; // Unique key for each notification

      if (
        notif.date === currentDate &&
        !notif.isTaken &&
        !processedNotifications.has(notifKey)
      ) {
        if (notif.time === currentTime) {
          // Normal notification
          setCurrentNotification({
            medicineName: notif.medicineName || "Unknown Medicine",
            time: currentTime,
            type: "normal",
          });
          playNotificationSound();
          setProcessedNotifications((prev) => new Set(prev).add(notifKey));
        } else if (notif.lateTime === currentTime) {
          // Warning notification
          setCurrentNotification({
            medicineName: notif.medicineName || "Unknown Medicine",
            time: currentTime,
            type: "warning",
          });
          playNotificationSound();
          setProcessedNotifications((prev) => new Set(prev).add(notifKey));
        } else if (notif.missedTime === currentTime) {
          // Missed notification
          setCurrentNotification({
            medicineName: notif.medicineName || "Unknown Medicine",
            time: currentTime,
            type: "missed",
          });
          playNotificationSound();
          setProcessedNotifications((prev) => new Set(prev).add(notifKey));
        }
      }
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAndTriggerNotifications();
    }, 1000);

    return () => clearInterval(interval);
  }, [notifications, processedNotifications]);

  return (
    <div>
      {currentNotification && (
        <NotificationCard
          medicineName={currentNotification.medicineName}
          time={currentNotification.time}
          onClose={() => setCurrentNotification(null)}
          type={currentNotification.type}
        />
      )}
    </div>
  );
};

export default Notifications;
