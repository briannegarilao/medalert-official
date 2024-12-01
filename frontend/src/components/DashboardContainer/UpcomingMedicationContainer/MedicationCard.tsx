interface MedicationCardProps {
  medicationName: string;
  time: string;
  dose: string; // Dosage information (e.g., "500mg")
  instruction: string; // Additional instructions for the medication (e.g., "Take after food")
  borderColor: string; // Color for the left border of the card (used for styling)
}

// Functional component to render a single medication card
const MedicationCard: React.FC<MedicationCardProps> = ({
  medicationName, // Medication name prop
  time, // Time prop
  dose, // Dose prop
  instruction, // Instruction prop
  borderColor, // Border color prop for styling
}) => (
  // Card container with a small bottom margin for spacing
  <div className="card" style={{ marginBottom: 5 }}>
    <div
      className="card-body" // Body of the card styled with Bootstrap classes
      style={{
        position: "relative", // Position relative for potential inner positioning
        borderLeft: `7px solid ${borderColor}`, // Left border with dynamic color
        backgroundColor: "#DFEEBA", // Light green background for the card
      }}
    >
      {/* Header section with medication name and time */}
      <div className="d-flex justify-content-between">
        <label>
          {/* Display the medication name */}
          <h3 style={{ fontSize: 16 }}>{medicationName}</h3>
        </label>
        {/* Display the time in red, aligned to the right */}
        <p
          style={{
            margin: "0", // Remove default margin
            fontSize: 15, // Slightly larger font size for visibility
            textAlign: "right", // Align text to the right
            color: "red", // Use red color for emphasis
          }}
        >
          {time}
        </p>
      </div>
      {/* Dose information, styled in gray */}
      <p style={{ margin: "0", fontSize: 14, color: "gray" }}>Dose: {dose}</p>
      {/* Instruction information, also styled in gray */}
      <p style={{ margin: "0", fontSize: 14, color: "gray" }}>
        Instruction: {instruction}
      </p>
    </div>
  </div>
);

export default MedicationCard;
