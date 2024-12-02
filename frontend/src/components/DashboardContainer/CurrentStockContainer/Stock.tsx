import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import StockCard from "./StockCard";
import Colors from "../../../theme/Colors";

interface Medication {
  medicationName: string;
  currentStock: number;
}

function Stock() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch medications from Firestore
  const fetchMedications = () => {
    const currentUser = "userId_0001"; // Adjust this with actual user ID logic
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
          currentStock: data.currentStock,
        };
        fetchedMedications.push(medication);
      });

      setMedications(fetchedMedications);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleStatus = () => {
    navigate("/HistoryLogs");
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Current Stock</h2>

      <div style={styles.medicationCardContainer}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
        ) : medications.length > 0 ? (
          medications.map((med, index) => (
            <StockCard
              key={index}
              medicationName={med.medicationName}
              currentStock={med.currentStock}
            />
          ))
        ) : (
          <p style={styles.paragraph}>No medications scheduled for today.</p>
        )}
      </div>

      {/* <button type="button" onClick={handleStatus} style={styles.checkStatsBtn}>
        Check all status
      </button> */}
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
  checkStatsBtn: {
    width: "100%",
    padding: "10px 24px",
    backgroundColor: Colors.blue01,
    color: Colors.white00,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
