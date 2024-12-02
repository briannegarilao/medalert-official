import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import Colors from "../../../theme/Colors";

interface MedicationCardProps {
  medicationName?: string;
  dosageValue?: string;
  dosageUnit?: string;
  specialInstruction?: string;
  backgroundColor?: string;
  time?: string;
  isTaken?: boolean; // Add isTaken prop
  onCheckboxChange?: (
    medicationName: string,
    time: string,
    isChecked: boolean
  ) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medicationName = "No Name",
  dosageValue = "No Dose",
  dosageUnit = "No Unit",
  specialInstruction = "No Instructions",
  backgroundColor = Colors.blue00,
  time = "No Time",
  isTaken = false, // Default to false
  onCheckboxChange,
}) => {
  const [isChecked, setIsChecked] = useState(isTaken);

  useEffect(() => {
    setIsChecked(isTaken); // Sync state with isTaken prop
  }, [isTaken]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    console.log(
      `${medicationName} at ${time} checkbox ${
        newCheckedState ? "highlighted" : "unhighlighted"
      }`
    );

    if (onCheckboxChange && medicationName && time) {
      onCheckboxChange(medicationName, time, newCheckedState);
    }
  };

  return (
    <div style={{ ...styles.card, backgroundColor: backgroundColor }}>
      <div style={styles.nameTime}>
        {medicationName && <h3 style={styles.heading}>{medicationName}</h3>}
        {time && <p style={styles.paragraph}>{time}</p>}
      </div>
      <div style={styles.bottomContainer}>
        <div>
          {dosageValue && dosageUnit && (
            <p style={styles.paragraph}>
              Dose: {dosageValue} {dosageUnit}
            </p>
          )}
          {specialInstruction && (
            <p style={styles.paragraph}>Instruction: {specialInstruction}</p>
          )}
        </div>
        <div
          style={{
            ...styles.checkboxContainer,
            backgroundColor: isChecked ? "white" : backgroundColor,
          }}
          onClick={handleCheckboxChange}
        >
          <i
            className="bi bi-check"
            style={{
              ...styles.checkmark,
              color: isChecked ? backgroundColor : "rgba(255, 255, 255, 0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicationCard;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "black",
    padding: "1rem",
    borderRadius: 8,
    color: "white",
    fontSize: 14,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  nameTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  paragraph: {
    marginBottom: 0,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    border: "2px solid white",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  checkmark: {
    fontSize: 24,
    pointerEvents: "none", // Prevent click propagation
    transition: "color 0.3s ease",
  },
};
