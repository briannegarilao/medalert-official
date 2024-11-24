import { useState } from "react";
import Colors from "../../../theme/Colors";

function MedInfo() {
  const [selectedColor, setSelectedColor] = useState("");
  const [medicineType, setMedicineType] = useState(""); // State for radio button selection

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF */}
      <div style={styles.lefthalf}>
        {/* Medicine Name */}
        <div style={styles.field}>
          <label style={styles.label}>Medicine Name</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            placeholder="Ex. Amoxicillin"
            style={styles.input}
          />
        </div>

        {/* Antibiotic or Non-Antibiotic */}
        <div style={styles.field}>
          <label style={styles.label}>What type of medication is this?</label>
          <div style={styles.radioFieldContainer}>
            {/* Antibiotic Option */}
            <label style={styles.radioLabel}>
              <input
                type="radio"
                id="antibiotic"
                name="medicineType"
                value="antibiotic"
                checked={medicineType === "antibiotic"}
                onChange={(e) => setMedicineType(e.target.value)}
                style={styles.radio}
              />
              Antibiotics
            </label>
            {/* Non-Antibiotic Option */}
            <label style={styles.radioLabel}>
              <input
                type="radio"
                id="nonAntibiotic"
                name="medicineType"
                value="nonAntibiotic"
                checked={medicineType === "nonAntibiotic"}
                onChange={(e) => setMedicineType(e.target.value)}
                style={styles.radio}
              />
              Non-Antibiotic Medication
            </label>
          </div>
        </div>

        {/* Choose Color */}
        <div style={styles.field}>
          <label style={styles.label}>
            Choose Color (for easy identification)
          </label>
          <div style={styles.colorContainer}>
            {["purple", "blue", "green", "pink", "orange", "yellow"].map(
              (color) => (
                <div
                  key={color}
                  onClick={() => handleColorChange(color)}
                  style={{
                    ...styles.colorShapes,
                    backgroundColor: color,
                    border:
                      selectedColor === color
                        ? `2px solid ${Colors.blue01}`
                        : "2px solid #fff",
                    boxShadow:
                      selectedColor === color
                        ? `0 0 5px ${Colors.blue01}`
                        : "none",
                  }}
                ></div>
              )
            )}
          </div>
        </div>
      </div>

      {/* RIGHT HALF */}
      <div style={styles.rightHalf}>
        {/* Dosage */}
        <div style={styles.field}>
          <label style={styles.label}>Dosage</label>
          <div style={styles.dosageInputContainer}>
            <input
              type="text"
              id="dosage"
              name="dosage"
              placeholder="Ex. 100"
              style={styles.input}
            />
            <select id="doseUnit" name="doseUnit" style={styles.select}>
              <option value="mg">mg</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="mcg">mcg</option>
            </select>
          </div>
        </div>

        {/* Special Instruction */}
        <div style={styles.field}>
          <label style={styles.label}>Special Instruction</label>
          <input
            type="text"
            id="specialInstruction"
            name="specialInstruction"
            placeholder="Ex. take with food"
            style={styles.input}
          />
        </div>
        {/* Stock */}
        <div style={styles.field}>
          <label style={styles.label}>
            How many doses do you currently have left in stock?
          </label>
          <select id="stock" name="stock" style={styles.select}>
            {Array.from({ length: 50 }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default MedInfo;

const styles: { [key: string]: React.CSSProperties } = {
  cardBody: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "24px",
  },
  lefthalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "24px",
  },
  rightHalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "24px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    width: "100%",
  },
  label: {
    fontSize: "16px",
    textAlign: "left",
    fontWeight: "500",
  },
  input: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  radioFieldContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  radioLabel: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
  },
  radio: {
    cursor: "pointer",
    marginRight: "8px",
    marginTop: "6px",
  },
  dosageInputContainer: {
    display: "flex",
    width: "100%",
    gap: "8px",
  },
  select: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  colorContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
  },
  colorShapes: {
    width: "32px",
    height: "32px",
    cursor: "pointer",
    borderRadius: "50%",
  },
};
