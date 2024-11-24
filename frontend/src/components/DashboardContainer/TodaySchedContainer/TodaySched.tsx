import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
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

// Meal interface
interface Meal {
  meal: string;
  time: string;
  medications: Medication[];
}

const TodaySched: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch medications and organize them into meals (Breakfast, Lunch, Dinner)
  const fetchMedications = async () => {
    try {
      const currentUser = "userId_0001"; // Replace with dynamic userId if needed
      const medicationsPath = `Users/${currentUser}/Medications`;

      // Reference the Medications collection
      const medicationsCollection = collection(db, medicationsPath);

      // Fetch documents in the Medications collection
      const querySnapshot = await getDocs(medicationsCollection);

      const breakfastMedications: Medication[] = [];
      const lunchMedications: Medication[] = [];
      const dinnerMedications: Medication[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const medication: Medication = {
          medicationName: data.name || "No Name",
          dose: data.dosage || "No Dose",
          instruction: data.instuction || "No Instructions",
          backgroundColor: data.color || "white",
        };

        // Process the daysToBeTaken map to get the times
        const daysToBeTaken = data.daysToBeTaken || {};

        // Iterate over daysToBeTaken and categorize times
        Object.keys(daysToBeTaken).forEach((day) => {
          const dayData = daysToBeTaken[day];

          // Check each "takeXX" time field (take01, take02, take03, etc.)
          Object.keys(dayData).forEach((takeTimeKey) => {
            const takeTime = dayData[takeTimeKey]; // e.g., "0700", "1300", "1900"

            // Map times to Breakfast, Lunch, or Dinner
            if (takeTime) {
              if (takeTime >= "0500" && takeTime < "1000") {
                breakfastMedications.push(medication);
              } else if (takeTime >= "1000" && takeTime < "1600") {
                lunchMedications.push(medication);
              } else if (takeTime >= "1600" && takeTime < "2000") {
                dinnerMedications.push(medication);
              }
            }
          });
        });
      });

      // Set the meals state
      setMeals([
        {
          meal: "Breakfast",
          time: "8:00 AM",
          medications: breakfastMedications,
        },
        {
          meal: "Lunch",
          time: "12:00 PM",
          medications: lunchMedications,
        },
        {
          meal: "Dinner",
          time: "7:00 PM",
          medications: dinnerMedications,
        },
      ]);
    } catch (error) {
      console.error("Error fetching medications: ", error);
      setMeals([]); // Fallback in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Today's Schedule</h2>

      <div style={styles.medicationCardContainer}>
        {loading ? (
          <p style={styles.paragraph}>LOADING...</p>
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
          <MealCard meal="No Meals" time="No Time" medications={[]} />
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
