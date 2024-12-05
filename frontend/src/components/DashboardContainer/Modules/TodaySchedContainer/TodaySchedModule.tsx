import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import Module from "../../ModuleCards/Module";
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
  notifications?: { date: string; time: string; isTaken: boolean }[];
  totalStock?: number;
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
      const today = new Date().toLocaleDateString("en-CA");
      const notifications = matchingMedication.notifications || [];
      const matchingIndex = notifications.findIndex(
        (notif) => notif.date === today && notif.time === time
      );

      if (matchingIndex !== -1) {
        notifications[matchingIndex].isTaken =
          !notifications[matchingIndex].isTaken;
        const takenCount = notifications.filter(
          (notif) => notif.isTaken
        ).length;
        const newStock = (matchingMedication.totalStock ?? 0) - takenCount;

        if (matchingMedication.id) {
          const medicationDocRef = doc(
            db,
            `Users/userId_0001/Medications`,
            matchingMedication.id
          );

          await updateDoc(medicationDocRef, {
            notifications: notifications,
            currentStock: newStock,
          });

          setMedications((prevMedications) =>
            prevMedications.map((med) =>
              med.id === matchingMedication.id
                ? {
                    ...med,
                    notifications: [...notifications],
                    currentStock: newStock,
                  }
                : med
            )
          );
        }
      }
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
    </Module>
  );
};

export default TodaySched;

const styles: { [key: string]: React.CSSProperties } = {
  paragraph: {
    fontSize: 16,
    textAlign: "center",
  },
};
