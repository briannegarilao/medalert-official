interface MedicationCardProps {
  medicationName: string;
  time: string;
  dose: string;
  instruction: string;
  borderColor: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medicationName,
  time,
  dose,
  instruction,
  borderColor,
}) => (
  <div className="card" style={{ marginBottom: 5 }}>
    <div
      className="card-body"
      style={{
        position: "relative",
        borderLeft: `7px solid ${borderColor}`,
        backgroundColor: "#DFEEBA",
      }}
    >
      <div className="d-flex justify-content-between">
        <label>
          <h3 style={{ fontSize: 16 }}>{medicationName}</h3>
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
      <p style={{ margin: "0", fontSize: 14, color: "gray" }}>Dose: {dose}</p>
      <p style={{ margin: "0", fontSize: 14, color: "gray" }}>
        Instruction: {instruction}
      </p>
    </div>
  </div>
);

export default MedicationCard;
