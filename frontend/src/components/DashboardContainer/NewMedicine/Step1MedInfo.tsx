import { useState } from "react";

function MedInfo() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div style={styles.cardBody}>
      {/* Medicine Name */}
      <div>
        <label htmlFor="medicineName" style={styles.label}>
          Medicine Name
        </label>
        <input
          type="text"
          id="medicineName"
          name="medicineName"
          placeholder="Ex. Amoxicillin"
          style={styles.input}
        />
      </div>

      {/* Antibiotic or Non-Antibiotic */}
      <div>
        <div style={styles.col50}>
          <input type="checkbox" id="exampleCheck1" style={styles.checkbox} />
          <label htmlFor="exampleCheck1" style={styles.label}>
            Antibiotics
          </label>
        </div>
        <div style={styles.col10}>
          <input type="checkbox" id="exampleCheck2" style={styles.checkbox} />
        </div>
        <div style={styles.col40}>
          <label
            htmlFor="exampleCheck2"
            style={{ ...styles.label, fontSize: 12 }}
          >
            Non-Antibiotic Medication
          </label>
        </div>
      </div>

      {/* Dosage */}
      <div>
        <label htmlFor="dosage" style={styles.label}>
          Dosage
        </label>
        <div style={styles.inputGroup}>
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
      <div>
        <label htmlFor="specialInstruction" style={styles.label}>
          Special Instruction
        </label>
        <input
          type="text"
          id="specialInstruction"
          name="specialInstruction"
          placeholder="Ex. after lunch"
          style={styles.input}
        />
      </div>

      {/* Stock */}
      <div>
        <label htmlFor="stock" style={styles.label}>
          How many doses do you currently have left in stock?
        </label>
        <select id="stock" name="stock" style={styles.select}>
          {Array.from({ length: 30 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Choose Color */}
      <div>
        <label htmlFor="chooseColor" style={styles.label}>
          Choose Color
        </label>
        <div style={styles.colorContainer}>
          {["purple", "blue", "green", "pink", "orange", "yellow"].map(
            (color) => (
              <div
                key={color}
                onClick={() => handleColorChange(color)}
                style={{
                  ...styles.colorCircle,
                  backgroundColor: color,
                  border:
                    selectedColor === color
                      ? "2px solid #000"
                      : "2px solid #ddd",
                  boxShadow:
                    selectedColor === color
                      ? "0 0 5px rgba(0,0,0,0.5)"
                      : "none",
                }}
              ></div>
            )
          )}
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
    gap: "1rem",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "14px",
    fontWeight: 500,
    color: "#333",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    width: "100%",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  col50: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  col10: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  col40: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  inputGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  select: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    flex: "none",
  },
  colorContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  colorCircle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};
