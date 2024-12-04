import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import MissedCard from "./MissedCard";
import Colors from "../../../theme/Colors";

interface Medication {
  medicineName: string;
  notifications: {
    date: string;
    time: string;
    isLate: boolean;
    isTaken: boolean;
    lateCount: number;
  }[];
}

function Stock() {
  const [missedMedications, setMissedMedications] = useState<
    {
      medicineName: string;
      missedTime: string;
      lateBy: string;
      isSevereLate: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchMissedMedications = () => {
    const currentUser = "userId_0001"; // Adjust this with actual user ID logic
    const medicationsCollection = collection(
      db,
      `Users/${currentUser}/Medications`
    );

    onSnapshot(medicationsCollection, (querySnapshot) => {
      const fetchedMissed: {
        medicineName: string;
        missedTime: string;
        lateBy: string;
        isSevereLate: boolean;
      }[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Medication;

        if (data.notifications) {
          data.notifications.forEach((notif) => {
            const [hours, minutes] = notif.time.split(":").map(Number);
            const notificationTime = new Date();
            notificationTime.setHours(hours, minutes, 0);

            const now = new Date();
            const lateDuration = now.getTime() - notificationTime.getTime();

            // Skip if the notification is not late yet
            if (lateDuration <= 0) return;

            if (notif.isLate && !notif.isTaken) {
              // Format the time to "6:00 AM"
              const formattedTime = notificationTime.toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              );

              // Convert lateDuration to hours and minutes
              const lateHours = Math.floor(lateDuration / (1000 * 60 * 60));
              const lateMinutes = Math.floor(
                (lateDuration % (1000 * 60 * 60)) / (1000 * 60)
              );

              const lateBy =
                lateHours > 0
                  ? `${lateHours} hr${lateHours > 1 ? "s" : ""}${
                      lateMinutes > 0 ? `, ${lateMinutes} min` : ""
                    }`
                  : `${lateMinutes} min`;

              const isSevereLate = lateMinutes > 15 || lateHours > 0;

              fetchedMissed.push({
                medicineName: data.medicineName,
                missedTime: formattedTime,
                lateBy,
                isSevereLate,
              });
            }
          });
        }
      });

      setMissedMedications(fetchedMissed);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMissedMedications();
  }, []);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Missed Medicines</h2>

      <div style={styles.medicationCardContainer}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
        ) : missedMedications.length > 0 ? (
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
          <p style={styles.paragraph}>No missed medications.</p>
        )}
      </div>
    </div>
  );
}

export default Stock;

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
