import React from "react";
import Colors from "../../../theme/Colors";

interface MedicationCardProps {
  medicationName?: string;
  dosageValue?: string;
  dosageUnit?: string;
  specialInstruction?: string;
  backgroundColor?: string;
  time?: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medicationName = "No Name",
  dosageValue = "No Dose",
  dosageUnit = "No Unit",
  specialInstruction = "No Instructions",
  backgroundColor = Colors.blue00,
  time = "No Time",
}) => {
  return (
    <div style={{ ...styles.card, backgroundColor: backgroundColor }}>
      <div style={styles.nameTime}>
        {medicationName && <h3 style={styles.heading}>{medicationName}</h3>}
        <p>{time}</p>
      </div>
      {dosageValue && dosageUnit && (
        <p style={styles.paragraph}>
          Dose: {dosageValue} {dosageUnit}
        </p>
      )}
      {specialInstruction && (
        <p style={styles.paragraph}>Instruction: {specialInstruction}</p>
      )}
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
  },
  paragraph: {
    marginBottom: 0,
  },
};
