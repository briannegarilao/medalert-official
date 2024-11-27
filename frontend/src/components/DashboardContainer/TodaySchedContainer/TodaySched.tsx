import React, { useEffect, useState } from "react";
import MedicationCard from "./MedicationCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Colors from "../../../theme/Colors";

// Medication interface
interface Medication {
  medicationName: string;
  dose: string;
  instruction: string;
  backgroundColor: string;
}

const TodaySched: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch medications from Firebase
  const fetchMedications = async () => {
    try {
      const currentUser = "userId_0001"; // Replace with dynamic userId if needed
      const medicationsCollection = collection(
        db,
        `Users/${currentUser}/Medications`
      );

      // Fetch documents in the Medications collection
      const querySnapshot = await getDocs(medicationsCollection);

      const fetchedMedications: Medication[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const medication: Medication = {
          medicationName: data.name || "No Name",
          dose: data.dosage || "No Dose",
          instruction: data.instuction || "No Instructions",
          backgroundColor: data.color || "white",
        };

        fetchedMedications.push(medication);
      });

      // Set the medications state
      setMedications(fetchedMedications);
    } catch (error) {
      console.error("Error fetching medications: ", error);
      setMedications([]); // Fallback in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Today's Medications</h2>

      <div style={styles.medicationCardContainer}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
        ) : medications.length > 0 ? (
          medications.map((med, index) => (
            <MedicationCard key={index} {...med} />
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
