import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import MedicationCard from "./MedicationCard";
import Colors from "../../../theme/Colors";

interface Medication {
  id?: string;
  medicationName?: string;
  dosageValue?: string;
  dosageUnit?: string;
  specialInstruction?: string;
  timesPerDay?: string[];
  datesToTake?: string[];
  backgroundColor?: string;
  notifications?: { date: string; time: string; isTaken: boolean }[];
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
        };

        fetchedMedications.push(medication);
      });

      setMedications(fetchedMedications);
      setLoading(false);
    });
  };

  const handleCheckboxChange = async (medicationName: string, time: string) => {
    const matchingMedication = medications.find(
      (med) =>
        med.medicationName === medicationName && med.timesPerDay?.includes(time)
    );

    if (matchingMedication) {
      const today = new Date().toLocaleDateString("en-CA"); // Format date as YYYY-MM-DD
      console.log(`Checkbox toggled for:`);
      console.log(`Medication: ${medicationName}`);
      console.log(`Date: ${today}`);
      console.log(`Time: ${time}`);
      console.log(`Document ID: ${matchingMedication.id}`);

      const notifications = matchingMedication.notifications || [];
      const matchingIndex = notifications.findIndex(
        (notif) => notif.date === today && notif.time === time
      );

      if (matchingIndex !== -1) {
        console.log(`Matching Notification Index: ${matchingIndex}`);
        console.log(
          "Notification Details Before Update:",
          notifications[matchingIndex]
        );

        // Toggle isTaken field
        notifications[matchingIndex].isTaken =
          !notifications[matchingIndex].isTaken;

        // Log the updated notification details
        console.log(
          "Notification Details After Update:",
          notifications[matchingIndex]
        );

        // Update Firestore document
        try {
          if (matchingMedication.id) {
            const medicationDocRef = doc(
              db,
              `Users/userId_0001/Medications`,
              matchingMedication.id
            );

            await updateDoc(medicationDocRef, {
              notifications: notifications,
            });

            console.log(
              `Firestore updated successfully for medication ${medicationName}`
            );
          } else {
            console.error("Medication ID is undefined.");
          }
        } catch (error) {
          console.error("Error updating Firestore:", error);
        }

        // Update the state with the modified notifications array
        setMedications((prevMedications) =>
          prevMedications.map((med) =>
            med.id === matchingMedication.id
              ? { ...med, notifications: [...notifications] }
              : med
          )
        );
      } else {
        console.log("No matching notification found in the array.");
      }
    } else {
      console.log("No matching medication found for the checkbox interaction.");
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
        isTaken: notification?.isTaken || false, // Pass the isTaken status
      };
    }),
  }));

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Today's Medications</h2>

      <div style={styles.medicationCardContainer}>
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
                isTaken={isTaken} // Pass isTaken to the card
                onCheckboxChange={(name) => handleCheckboxChange(name, time)}
              />
            ))
          )
        ) : (
          <p style={styles.paragraph}>No medications scheduled for today.</p>
        )}
      </div>
    </div>
  );
};

export default TodaySched;

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
  medicationCardContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
  },
};
