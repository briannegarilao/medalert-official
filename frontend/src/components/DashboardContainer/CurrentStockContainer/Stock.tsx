import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import StockCard from "./StockCard";
import StockList from "./StockList";

function Stock() {
  const [medications, setMedications] = useState<
    { name: string; remainingStock: number; hasStock: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "medications"));
        const meds = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          remainingStock: doc.data().remainingStock,
          hasStock: doc.data().remainingStock > 0,
        }));
        setMedications(meds);
      } catch (error) {
        console.error("Error fetching medications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleStatus = () => {
    navigate("/HistoryLogs");
  };

  return (
    <StockCard title="Current Stock">
      {loading ? (
        <p>Loading...</p>
      ) : medications.length > 0 ? (
        <StockList data={medications} />
      ) : (
        <p>No medications scheduled for today. Tap "Add Medicine" to get started!</p>
      )}
      <div className="row" style={{ marginTop: 10 }}>
        <button
          type="button"
          className="btn btn-light"
          onClick={handleStatus}
        >
          Check all status
        </button>
      </div>
    </StockCard>
  );
}

export default Stock;
