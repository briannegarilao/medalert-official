import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; 
import Card from "./Card";

function CarouselContainer() {
  const [medicineData, setMedicineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "medicines"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMedicineData(data);
      } catch (error) {
        console.error("Error fetching medicines: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (medicineData.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>No medications scheduled for today. Tap "Add Medicine" to get started!</p>
      </div>
    );
  }

  return (
    <div
      id="medicineCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ maxWidth: "100%", padding: "1rem" }}
    >
      <div className="carousel-inner">
        {medicineData.map((data, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <Card data={data} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#medicineCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#medicineCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselContainer;
