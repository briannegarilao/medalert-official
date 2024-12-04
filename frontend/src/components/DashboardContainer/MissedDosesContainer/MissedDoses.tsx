import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import MissedCard from "./MissedCard";
import Colors from "../../../theme/Colors";

interface Notification {
  date: string;
  time: string;
  isLate: boolean;
  isTaken: boolean;
  lateCount: number;
}

interface Medication {
  id: string;
  medicineName: string;
  notifications: Notification[];
}

const MissedDoses: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [missedMedications, setMissedMedications] = useState<
    {
      medicineName: string;
      missedTime: string;
      lateBy: string;
      isSevereLate: boolean;
    }[]
  >([]);

  const fetchMedications = () => {
    console.log("Initializing Firestore real-time listener...");
    const currentUser = "userId_0001"; // Replace with actual user logic
    const medicationsCollection = collection(
      db,
      `Users/${currentUser}/Medications`
    );

    onSnapshot(medicationsCollection, (querySnapshot) => {
      const fetchedMedications: Medication[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Medication;
        fetchedMedications.push({ ...data, id: doc.id });
      });

      console.log("Fetched medications data from Firestore:", fetchedMedications);
      setMedications(fetchedMedications);
    });
  };

  const markLateNotifications = async () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS

    medications.forEach(async (medication) => {
      const updatedNotifications = medication.notifications.map((notif) => {
        const notificationTime = new Date(`${notif.date}T${notif.time}`);
        const isLate =
          !notif.isTaken &&
          new Date(`${notif.date}T${currentTime}`) > notificationTime;

        if (isLate && !notif.isLate) {
          notif.isLate = true; // Mark as late
        }
        return notif;
      });

      // Update Firestore with the updated notifications if any changes were made
      if (medication.notifications.some((notif) => notif.isLate)) {
        const medicationDocRef = doc(
          db,
          `Users/userId_0001/Medications`,
          medication.id
        );
        await updateDoc(medicationDocRef, { notifications: updatedNotifications });
      }
    });
  };

  const updateMissedMedications = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const updatedMissedMedications: {
      medicineName: string;
      missedTime: string;
      lateBy: string;
      isSevereLate: boolean;
    }[] = [];

    medications.forEach((medication) => {
      medication.notifications
        .filter((notif) => notif.isLate && notif.date === currentDate)
        .forEach((notif) => {
          const notificationTime = new Date(`${notif.date}T${notif.time}`);
          const timeDifference = now.getTime() - notificationTime.getTime();
          const lateHours = Math.floor(timeDifference / (1000 * 60 * 60));
          const lateMinutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );

          const formattedTime = notificationTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          const missedMedication = {
            medicineName: medication.medicineName,
            missedTime: formattedTime,
            lateBy:
              lateHours > 0
                ? `${lateHours} hr${lateHours > 1 ? "s" : ""}${
                    lateMinutes > 0 ? `, ${lateMinutes} min` : ""
                  }`
                : `${lateMinutes} min`,
            isSevereLate: lateMinutes > 15 || lateHours > 0,
          };

          updatedMissedMedications.push(missedMedication);
        });
    });

    setMissedMedications(updatedMissedMedications);

    if (updatedMissedMedications.length > 0) {
      console.log("Late Medications for Today:", updatedMissedMedications);
    } else {
      console.log("No late medications for today.");
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      markLateNotifications();
      updateMissedMedications();
    }, 1000); // Run every second

    return () => clearInterval(interval);
  }, [medications]);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Missed Medicines Today</h2>

      <div style={styles.medicationCardContainer}>
        {missedMedications.length > 0 ? (
          missedMedications.map((med, index) => (
            <MissedCard
              key={index}
              medicationName={med.medicineName}
              missedTime={med.missedTime}
              lateBy={med.lateBy}
              isSevereLate={med.isSevereLate}
            />
          ))
        ) : (
          <p style={styles.paragraph}>No missed medications for today.</p>
        )}
      </div>
    </div>
  );
};

export default MissedDoses;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    height: "100%",
    padding: "1rem",
    borderRadius: 8,
    border: `1px solid ${Colors.gray00}`,
    boxShadow: `0 4px 8px ${Colors.gray00}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
    gap: 8,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
  },
  medicationCardContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
  },
};
