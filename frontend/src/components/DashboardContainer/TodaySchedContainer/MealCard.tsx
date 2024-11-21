// MealCard.tsx
import React from "react";
import MedicationCard from "./MedicationCard";

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
    <div className="card shadow-sm" style={{ marginBottom: 10 }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <label>
            <h3 style={{ fontSize: 16 }}>{meal}</h3>
          </label>
          <p
            style={{
              margin: "0",
              fontSize: 15,
              textAlign: "right",
              color: "red",
            }}
          >
            {time}
          </p>
        </div>

        {/* Render medications or a blank placeholder */}
        {medications.length > 0 ? (
          medications.map((med, index) => (
            <MedicationCard key={index} {...med} />
          ))
        ) : (
          <MedicationCard />
        )}
      </div>
    </div>
  );
};

export default MealCard;
