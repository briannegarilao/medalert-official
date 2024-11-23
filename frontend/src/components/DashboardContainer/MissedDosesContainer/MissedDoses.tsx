import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; 
import MissedDoseList from "./MissedDoseList";
import Card from "./Card";

function MissedDoses() {
  const [missedDoses, setMissedDoses] = useState<{ name: string; timeMissed: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissedDoses = async () => {
      try {
        const missedDosesCollection = collection(db, "MissedDoses"); // Replace "MissedDoses" with your collection name
        const snapshot = await getDocs(missedDosesCollection);

        if (!snapshot.empty) {
          const doses = snapshot.docs.map((doc) => doc.data() as { name: string; timeMissed: string });
          setMissedDoses(doses);
        }
      } catch (error) {
        console.error("Error fetching missed doses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissedDoses();
  }, []);

  return (
    <Card title="Missed Doses">
      {loading ? (
        <p>Loading...</p>
      ) : missedDoses.length > 0 ? (
        <MissedDoseList data={missedDoses} />
      ) : (
        <p>No medications scheduled for today. Tap "Add Medicine" to get started!</p>
      )}
    </Card>
  );
}

export default MissedDoses;
