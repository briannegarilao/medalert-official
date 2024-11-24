import React from "react";
import MedicationCard from "./MedicationCard";
import Colors from "../../../theme/Colors";

interface Medication {
  medicationName: string;
  dose: string;
  instruction: string;
  backgroundColor: string;
}

interface MealCardProps {
  meal: string;
  time: string;
  medications: Medication[];
}

const MealCard: React.FC<MealCardProps> = ({ meal, time, medications }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.heading}>{meal}</h3>
        <p style={styles.paragraph}>{time}</p>
      </div>

      {/* Render medications or a blank placeholder */}
      {medications.length > 0 ? (
        medications.map((med, index) => <MedicationCard key={index} {...med} />)
      ) : (
        <MedicationCard />
      )}
    </div>
  );
};

export default MealCard;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    padding: "1rem",
    borderRadius: 8,
    border: `1px solid ${Colors.gray00}`,
    boxShadow: `0 4px 8px ${Colors.gray00}`,

    color: "white",
    fontSize: 14,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "felx-start",
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
    color: "black",
  },
  paragraph: {
    margin: "0",
    fontSize: 15,
    textAlign: "right",
    color: "red",
  },
};
