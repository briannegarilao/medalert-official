import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

interface Medication {
  medicationName: string;
  dose: string;
  instruction: string;
  backgroundColor: string;
}

interface Meal {
  meal: string;
  time: string;
  medications: Medication[];
}

const TodaySched: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      const currentUser = "userId_001"; 
      const mealsCollection = collection(db, "Users", currentUser, "Medications");                

      // Query Firestore to get meals
      const mealsQuery = query(mealsCollection);
      const querySnapshot = await getDocs(mealsQuery);

      const fetchedMeals: Meal[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMeals.push(doc.data() as Meal);
      });

      setMeals(fetchedMeals);
    } catch (error) {
      console.error("Error fetching meals: ", error);
      setMeals([]); // Fallback in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  

    fetchMeals();
  }, []);

  return (
    <div
      className="card shadow"
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "494px",
        padding: "1rem",
      }}
    >
      <h2 className="card-title" style={{ textAlign: "center", fontSize: 20 }}>
        Today's Schedule
      </h2>

      <div
        className="container"
        style={{
          marginTop: 20,
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "0.5rem",
        }}
      >
        {loading ? (
          <p>
            No medications scheduled for today. Tap 'Add Medicine' to get
            started!
          </p>
        ) : meals.length > 0 ? (
          meals.map((meal, index) => (
            <MealCard
              key={index}
              meal={meal.meal}
              time={meal.time}
              medications={meal.medications}
            />
          ))
        ) : (
          <MealCard meal="No Meals" time="" medications={[]} />
        )}
      </div>
    </div>
  );
};

export default TodaySched;
