import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import Module from "../../ModuleCards/Module";
import MissedCard from "./MissedCard";

interface Notification {
  date: string;
  time: string;
  isLate: boolean;
  isTaken: boolean;
  isMissed: boolean;
}

interface Medication {
  id: string;
  medicineName: string;
  notifications: Notification[];
}

interface MissedMedication {
  medicationName: string;
  missedTime: string;
  lateBy: string;
  isSevereLate: boolean;
}

const MissedMeds: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [missedMedications, setMissedMedications] = useState<
    MissedMedication[]
  >([]);

  const fetchMedications = () => {
    const currentUser = "userId_0001";
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

      setMedications(fetchedMedications);
    });
  };

  const markLateNotifications = () => {
    const now = new Date();
    const currentTime = now.getTime();
    const batch = writeBatch(db);

    const updatedMedications = medications.map((medication) => {
      let needsUpdate = false;

      const updatedNotifications = medication.notifications.map((notif) => {
        const notificationTime = new Date(
          `${notif.date}T${notif.time}`
        ).getTime();
        const timeDifference = currentTime - notificationTime;

        if (!notif.isTaken) {
          if (!notif.isLate && timeDifference >= 5 * 60 * 1000) {
            notif.isLate = true;
            needsUpdate = true;
          }
          if (!notif.isMissed && timeDifference >= 15 * 60 * 1000) {
            notif.isMissed = true;
            needsUpdate = true;
          }
        }

        return notif;
      });

      if (needsUpdate) {
        const medicationDocRef = doc(
          db,
          `Users/userId_0001/Medications`,
          medication.id
        );
        batch.update(medicationDocRef, { notifications: updatedNotifications });
      }

      return { ...medication, notifications: updatedNotifications };
    });

    setMedications(updatedMedications);

    batch
      .commit()
      .catch((error) => console.error("Error updating Firestore:", error));
  };

  const updateMissedMedications = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-CA");
    const updatedMissedMedications: MissedMedication[] = [];

    medications.forEach((medication) => {
      medication.notifications
        .filter(
          (notif) =>
            !notif.isTaken &&
            notif.date === currentDate &&
            (notif.isLate || notif.isMissed)
        )
        .forEach((notif) => {
          const notificationTime = new Date(`${notif.date}T${notif.time}`);
          const timeDifference = now.getTime() - notificationTime.getTime();
          const lateHours = Math.floor(timeDifference / (1000 * 60 * 60));
          const lateMinutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );

          updatedMissedMedications.push({
            medicationName: medication.medicineName,
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
            isSevereLate: notif.isMissed,
          });
        });
    });

    setMissedMedications(updatedMissedMedications);
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      markLateNotifications();
    }, 3000);

    return () => clearInterval(interval);
  }, [medications]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      updateMissedMedications();
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [medications]);

  return (
    <Module title="Missed Medicines Today">
      <div style={styles.missedMedsContainer}>
        {missedMedications.length > 0 ? (
          missedMedications.map((med, index) => (
            <MissedCard
              key={index}
              medicationName={med.medicationName}
              missedTime={med.missedTime}
              lateBy={med.lateBy}
              isSevereLate={med.isSevereLate}
            />
          ))
        ) : (
          <p style={styles.paragraph}>No missed medications for today.</p>
        )}
      </div>
    </Module>
  );
};

export default MissedMeds;

const styles: { [key: string]: React.CSSProperties } = {
  missedMedsContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    overflowY: "auto",
    borderRadius: 8,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
  },
};
