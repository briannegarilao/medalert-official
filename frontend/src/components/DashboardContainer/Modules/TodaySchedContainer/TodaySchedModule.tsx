import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import Module from "../../../ModuleCards/Module";
import MedicationCard from "./MedicationCard";

interface Medication {
  id?: string;
  medicationName?: string;
  dosageValue?: string;
  dosageUnit?: string;
  specialInstruction?: string;
  timesPerDay?: string[];
  datesToTake?: string[];
  backgroundColor?: string;
  notifications?: {
    date: string;
    time: string;
    isTaken: boolean;
    isLate?: boolean;
    isMissed?: boolean;
  }[];
  totalStock?: number;
  history?: {
    date: string;
    time: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    status: string;
  }[];
}

const TodaySched: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedications = () => {
    const currentUser = "userId_0001";
    const medicationsCollection = collection(
      db, 
      `Users/${currentUser}/Medications`
    );

    onSnapshot(medicationsCollection, (querySnapshot) => {
      const fetchedMedications: Medication[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const medication: Medication = {
          id: doc.id,
          medicationName: data.medicineName,
          dosageValue: data.dosageValue,
          dosageUnit: data.dosageUnit,
          specialInstruction: data.specialInstruction,
          timesPerDay: data.timesPerDay,
          datesToTake: data.datesToTake,
          backgroundColor: data.selectedColor,
          notifications: data.notifications,
          totalStock: data.totalStock,
          history: data.history || [],
        };

        fetchedMedications.push(medication);
      });

      setMedications(fetchedMedications);
      setLoading(false);
    });
  };

  const handleCheckboxChange = async (medicationName: string, time: string) => {
    try {
      const matchingMedication = medications.find(
        (med) =>
          med.medicationName === medicationName &&
          med.timesPerDay?.includes(time)
      );

      if (matchingMedication) {
        const today = new Date().toLocaleDateString("en-CA");
        const now = new Date().toLocaleTimeString("en-GB", { hour12: false });
        const notifications = matchingMedication.notifications || [];
        const matchingIndex = notifications.findIndex(
          (notif) => notif.date === today && notif.time === time
        );

        if (matchingIndex !== -1) {
          const updatedNotifications = [...notifications];
          const previousState = updatedNotifications[matchingIndex].isTaken;
          updatedNotifications[matchingIndex].isTaken = !previousState;

          const takenCount = updatedNotifications.filter(
            (notif) => notif.isTaken
          ).length;

          const newStock = (matchingMedication.totalStock ?? 0) - takenCount;

          // Determine status for history
          let status = "Taken";
          if (updatedNotifications[matchingIndex].isMissed) {
            status = "Taken Missed";
          } else if (updatedNotifications[matchingIndex].isLate) {
            status = "Taken Late";
          }

          // Log actions
          console.log(
            `Action: ${status} | Medicine: ${medicationName} | Time: ${time}`
          );

          const newHistoryEntry = {
            date: today,
            time: now,
            medicineName: matchingMedication.medicationName || "Unknown",
            dosage: `${matchingMedication.dosageValue}${matchingMedication.dosageUnit}`,
            frequency: `${
              matchingMedication.timesPerDay?.length || 1
            } times a day`,
            status,
          };

          const updatedHistory = [
            ...(matchingMedication.history || []),
            newHistoryEntry,
          ];

          if (matchingMedication.id) {
            const medicationDocRef = doc(
              db,
              `Users/userId_0001/Medications`,
              matchingMedication.id
            );

            // Update Firebase
            await updateDoc(medicationDocRef, {
              notifications: updatedNotifications,
              currentStock: newStock,
              history: updatedHistory,
            });

            console.log(
              `History updated for ${medicationName}: `,
              newHistoryEntry
            );

            // Update local state
            setMedications((prevMedications) =>
              prevMedications.map((med) =>
                med.id === matchingMedication.id
                  ? {
                      ...med,
                      notifications: updatedNotifications,
                      currentStock: newStock,
                      history: updatedHistory,
                    }
                  : med
              )
            );
          }
        }
      }
    } catch (error) {
      console.error(
        `Error updating 'isTaken' for ${medicationName} at ${time}: `,
        error
      );
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const todaysMedications = medications.map((med) => ({
    ...med,
    timesPerDay: med.timesPerDay?.map((time) => {
      const today = new Date().toLocaleDateString("en-CA");
      const notification = med.notifications?.find(
        (notif) => notif.date === today && notif.time === time
      );

      return {
        time,
        formattedTime: new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        isTaken: notification?.isTaken || false,
      };
    }),
  }));

  return (
    <Module title="Today's Medications">
      <div style={styles.container}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
        ) : todaysMedications.length > 0 ? (
          todaysMedications.map((med, index) =>
            med.timesPerDay?.map(({ time, formattedTime, isTaken }) => (
              <MedicationCard
                key={`${index}-${time}`}
                medicationName={med.medicationName}
                dosageValue={med.dosageValue}
                dosageUnit={med.dosageUnit}
                specialInstruction={med.specialInstruction}
                backgroundColor={med.backgroundColor}
                time={formattedTime}
                isTaken={isTaken}
                onCheckboxChange={(name) => handleCheckboxChange(name, time)}
              />
            ))
          )
        ) : (
          <p style={styles.paragraph}>No medications scheduled for today.</p>
        )}
      </div>
    </Module>
  );
};

export default TodaySched;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
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
