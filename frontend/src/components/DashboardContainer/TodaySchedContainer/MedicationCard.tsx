// MedicationCard.tsx
import React from "react";
import  Colors from "../../../theme/Colors";

interface MedicationCardProps {
  medicationName?: string;
  dose?: string;
  instruction?: string;
  backgroundColor?: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medicationName = "No Medication",
  dose = "sample dose",
  instruction = "this is the instructions",
  backgroundColor = Colors.blue00, 
}) => {

  return (
    <div className="card" style={{ marginTop: 10 }}>
      <div
        className="card-body"
        style={{
          position: "relative",
          backgroundColor,
        }}
      >
        <div className="d-flex justify-content-between">
          <label>
            <h3 style={{ fontSize: 16, color: "white" }}>{medicationName}</h3>
          </label>
        </div>
        {dose && (
          <p style={{ margin: "0", fontSize: 14, color: "white" }}>
            Dose: {dose}
          </p>
        )}
        {instruction && (
          <p style={{ margin: "0", fontSize: 14, color: "white" }}>
            Instruction: {instruction}
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicationCard;
