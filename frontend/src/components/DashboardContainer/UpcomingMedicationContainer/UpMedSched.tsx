import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

import DateSelector from "./DateSelector";
import MedicationCard from "./MedicationCard";
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

const UpMedSched: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
  });
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
      setLoading(false);
    });
  };

  const formatTime = (timeString: string): string => {
    const [hour, minute] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const getFilteredMedications = () => {
    const selected = new Date(selectedDate + "T00:00:00"); // Force local timezone interpretation
    const filteredMedications: { medication: Medication; time: string }[] = [];

    medications.forEach((med) => {
      if (
        med.datesToTake?.some(
          (date) => new Date(date).toDateString() === selected.toDateString()
        )
      ) {
        med.timesPerDay?.forEach((time) => {
          filteredMedications.push({ medication: med, time: formatTime(time) });
        });
      }
    });

    return filteredMedications;
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const filteredMedications = getFilteredMedications();

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Upcoming Medication Schedule</h2>

      <DateSelector
        selectedDate={selectedDate}
        onDateChange={(newDate) => setSelectedDate(newDate)}
      />

      <div style={styles.medicationCardContainer}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
        ) : filteredMedications.length > 0 ? (
          filteredMedications.map((med, index) => (
            <MedicationCard
              key={index}
              {...med.medication}
              time={med.time} // Pass the specific time
            />
          ))
        ) : (
          <p style={styles.paragraph}>
            No medications scheduled for {new Date(selectedDate).toDateString()}
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default UpMedSched;

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
    gap: 16,
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
