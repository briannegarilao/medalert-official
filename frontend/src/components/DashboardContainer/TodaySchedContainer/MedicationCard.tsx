import React from "react";
import Colors from "../../../theme/Colors";

interface MedicationCardProps {
  medicationName?: string;
  dose?: string;
  instruction?: string;
  backgroundColor?: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medicationName = "No Medication",
  dose = "no dosage available",
  instruction = "no instruction available",
  backgroundColor = Colors.blue00,
}) => {
  return (
    // MAIN CARD CONTAINER
    <div style={{ ...styles.card, backgroundColor: backgroundColor }}>
      {medicationName && <h3 style={styles.heading}>{medicationName}</h3>}
      {dose && <p style={styles.paragraph}>Dose: {dose}</p>}
      {instruction && (
        <p style={styles.paragraph}>Instruction: {instruction}</p>
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
  heading: {
    fontSize: 20,
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 0,
  },
};
