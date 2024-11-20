// TodaySched.tsx
import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../../firebaseConfig"; // Import the correct db for Realtime Database

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

  useEffect(() => {
    const mealsRef = ref(realtimeDb, "users/currentUser/meals");

    const unsubscribe = onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedMeals: Meal[] = Object.values(data);
        setMeals(fetchedMeals);
      } else {
        setMeals([]); // No meals found
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
