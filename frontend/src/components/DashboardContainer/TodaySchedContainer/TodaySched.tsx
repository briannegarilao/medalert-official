import React, { useEffect, useState } from "react";
import MedicationCard from "./MedicationCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Colors from "../../../theme/Colors";

// Medication interface
interface Medication {
  medicationName?: string;
  dosageValue?: string;
  dosageUnit?: string;
  specialInstruction?: string;
  timesPerDay?: string[];
  datesToTake?: string[];
  backgroundColor?: string;
}

const TodaySched: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch medications from Firebase using onSnapshot
  const fetchMedications = () => {
    const currentUser = "userId_0001"; // Replace with dynamic userId if needed
    const medicationsCollection = collection(
      db,
      `Users/${currentUser}/Medications`
    );

    // Listen for real-time changes
    onSnapshot(medicationsCollection, (querySnapshot) => {
      const fetchedMedications: Medication[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const medication: Medication = {
          medicationName: data.medicineName,
          dosageValue: data.dosageValue,
          dosageUnit: data.dosageUnit,
          specialInstruction: data.specialInstruction,
          timesPerDay: data.timesPerDay,
          datesToTake: data.datesToTake,
          backgroundColor: data.selectedColor,
        };

        fetchedMedications.push(medication);
      });

      setMedications(fetchedMedications);
      console.log("Fetched Medications:", fetchedMedications);
      setLoading(false);
    });
  };

  const formatTime = (timeString: string): string => {
    const [hour, minute] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  // Filter medications for today
  const getTodaysMedications = () => {
    const today = new Date();
    const todayMedications: { medication: Medication; time: string }[] = [];

    medications.forEach((med) => {
      if (
        med.datesToTake?.some(
          (date) => new Date(date).toDateString() === today.toDateString()
        )
      ) {
        med.timesPerDay?.forEach((time) => {
          todayMedications.push({ medication: med, time: formatTime(time) });
        });
      }
    });

    return todayMedications;
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const todaysMedications = getTodaysMedications();

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Today's Medications</h2>

      <div style={styles.medicationCardContainer}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
        ) : todaysMedications.length > 0 ? (
          todaysMedications.map((med, index) => (
            <MedicationCard
              key={index}
              {...med.medication}
              time={med.time} // Pass the specific time
            />
          ))
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
    padding: "1rem",
    borderRadius: 8,
    border: `1px solid ${Colors.gray00}`,
    boxShadow: `0 4px 8px ${Colors.gray00}`,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  medicationCardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
  },
};
