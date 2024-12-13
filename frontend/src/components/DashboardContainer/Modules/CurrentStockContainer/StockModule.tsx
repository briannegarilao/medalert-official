import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import StockCard from "./StockCard";
import Module from "../../../ModuleCards/Module"; // Import the reusable Module component
import Colors from "../../../../theme/Colors";

interface Medication {
  medicationName: string;
  currentStock: number;
}

const Stock: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();

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

  // const handleStatus = () => {
  //   navigate("/HistoryLogs");
  // };

  return (
    <Module title="Current Stock">
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
          <p style={styles.paragraph}>No medications available in stock.</p>
        )}
      </div>

      {/* <button type="button" onClick={handleStatus} style={styles.checkStatsBtn}>
        Check all status
      </button> */}
    </Module>
  );
};

export default Stock;

const styles: { [key: string]: React.CSSProperties } = {
  medicationCardContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
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
