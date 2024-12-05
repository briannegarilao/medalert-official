import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import MissedCard from "./MissedCard";
import Colors from "../../../theme/Colors";

interface Notification {
  date: string;
  time: string;
  isLate: boolean;
  isTaken: boolean;
  lateCount: number;
  isMissed: boolean;
}

interface Medication {
  id: string;
  medicineName: string;
  notifications: Notification[];
}

interface MissedMedication {
  medicineName: string;
  missedTime: string;
  lateBy: string;
  isSevereLate: boolean;
}

const MissedDoses: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [missedMedications, setMissedMedications] = useState<MissedMedication[]>([]);

  const fetchMedications = () => {
    console.log("Initializing Firestore real-time listener...");
    const currentUser = "userId_0001";
    const medicationsCollection = collection(db, `Users/${currentUser}/Medications`);

    onSnapshot(medicationsCollection, (querySnapshot) => {
      const fetchedMedications: Medication[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Medication;
        fetchedMedications.push({ ...data, id: doc.id });
      });

      console.log("Fetched medications data from Firestore:", fetchedMedications);
      setMedications(fetchedMedications);

      // Perform initial marking on first fetch
      markLateNotifications(fetchedMedications);
    });
  };

  const markLateNotifications = async (fetchedMedications: Medication[] = medications) => {
    const now = new Date();
    const currentTime = now.getTime();
    const batch = writeBatch(db);
  
    fetchedMedications.forEach((medication) => {
      let needsUpdate = false;
  
      const updatedNotifications = medication.notifications.map((notif) => {
        const notificationTime = new Date(`${notif.date}T${notif.time}`).getTime();
        const timeDifference = currentTime - notificationTime;
  
        if (!notif.isTaken && !notif.isMissed) {
          // Mark as late and increment lateCount
          if (timeDifference >= (notif.lateCount + 1) * 5 * 60 * 1000) {
            notif.isLate = true;
            notif.lateCount = (notif.lateCount || 0) + 1;
            needsUpdate = true;
          }
  
          // Mark as missed if lateCount > 3
          if (notif.lateCount > 3 && !notif.isMissed) {
            notif.isMissed = true;
            needsUpdate = true;
          }
        }
  
        return notif;
      });
  
      // Only update Firestore if there are actual changes
      if (needsUpdate) {
        const medicationDocRef = doc(
          db,
          `Users/userId_0001/Medications`,
          medication.id
        );
        batch.update(medicationDocRef, { notifications: updatedNotifications });
      }
    });
  
    try {
      await batch.commit();
      console.log("Updated late and missed notifications in Firestore.");
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };
  

  const updateMissedMedications = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-CA");
    const updatedMissedMedications: MissedMedication[] = [];

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

          updatedMissedMedications.push({
            medicineName: medication.medicineName,
            missedTime: notificationTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
            lateBy:
              lateHours > 0
                ? `${lateHours} hr${lateHours > 1 ? "s" : ""}${
                    lateMinutes > 0 ? `, ${lateMinutes} min` : ""
                  }`
                : `${lateMinutes} min`,
            isSevereLate: lateMinutes > 15 || lateHours > 0,
          });
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
    const writeInterval = setInterval(() => {
      markLateNotifications();
    }, 60000); // Write to Firestore every minute

    return () => clearInterval(writeInterval);
  }, [medications]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      updateMissedMedications();
    }, 1000); // Check for UI updates every second

    return () => clearInterval(checkInterval);
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
