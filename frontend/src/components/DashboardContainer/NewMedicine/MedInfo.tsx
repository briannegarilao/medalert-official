import Colors from "../../../theme/Colors";

function MedInfo({
  medicineData,
  setMedicineData,
}: {
  medicineData: any;
  setMedicineData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleMedicineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicineData({ ...medicineData, medicineName: e.target.value });
  };
  const handleDosageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicineData({ ...medicineData, dosageValue: e.target.value });
  };
  const handleDosageUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMedicineData({ ...medicineData, dosageUnit: e.target.value });
  };
  const handleAntibioticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicineData({ ...medicineData, isAntibiotic: e.target.value });
  };
  const handleSpecialInstructionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicineData({ ...medicineData, specialInstruction: e.target.value });
  };
  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMedicineData({ ...medicineData, stock: Number(e.target.value) });
  };
  const handleColorChange = (color: string) => {
    setMedicineData({ ...medicineData, selectedColor: color });
  };

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF OF THE FORM */}
      <div style={styles.lefthalf}>
        {/* Medicine Name Input Field */}
        <div style={styles.field}>
          <label style={styles.label}>Medicine Name</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            // Controlled component - value directly from state
            value={medicineData.medicineName}
            // Update handler called on every input change
            onChange={handleMedicineNameChange}
            placeholder="Ex. Amoxicillin"
            style={styles.input}
          />
        </div>

        {/* Medication Type Selection (Antibiotic or Non-Antibiotic) */}
        <div style={styles.field}>
          <label style={styles.label}>What type of medication is this?</label>
          <div style={styles.radioFieldContainer}>
            {/* Antibiotic Radio Button */}
            <label style={styles.radioLabel}>
              <input
                type="radio"
                id="antibiotic"
                name="medicineType"
                value="antibiotic"
                // Checked state controlled by comparing with current state
                checked={medicineData.isAntibiotic === "antibiotic"}
                onChange={handleAntibioticChange}
                style={styles.radio}
              />
              Antibiotics
            </label>

            {/* Non-Antibiotic Radio Button */}
            <label style={styles.radioLabel}>
              <input
                type="radio"
                id="nonAntibiotic"
                name="medicineType"
                value="nonAntibiotic"
                checked={medicineData.isAntibiotic === "nonAntibiotic"}
                onChange={handleAntibioticChange}
                style={styles.radio}
              />
              Non-Antibiotic Medication
            </label>
          </div>
        </div>

        {/* Color Selection for Medicine Identification */}
        <div style={styles.field}>
          <label style={styles.label}>
            Choose Color (for easy identification)
          </label>
          <div style={styles.colorContainer}>
            {/* Dynamically render color options */}
            {["purple", "blue", "green", "pink", "orange", "yellow"].map(
              (color) => (
                <div
                  key={color}
                  // Click handler to select color
                  onClick={() => handleColorChange(color)}
                  style={{
                    ...styles.colorShapes,
                    backgroundColor: color,
                    // Conditional styling for selected color
                    border:
                      medicineData.selectedColor === color
                        ? `2px solid ${Colors.blue01}`
                        : "2px solid #fff",
                    boxShadow:
                      medicineData.selectedColor === color
                        ? `0 0 5px ${Colors.blue01}`
                        : "none",
                  }}
                ></div>
              )
            )}
          </div>
        </div>
      </div>

      {/* RIGHT HALF OF THE FORM */}
      <div style={styles.rightHalf}>
        {/* Dosage Input with Unit Selection */}
        <div style={styles.field}>
          <label style={styles.label}>Dosage</label>
          <div style={styles.dosageInputContainer}>
            {/* Dosage Value Input */}
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={medicineData.dosageValue}
              onChange={handleDosageValueChange}
              placeholder="Ex. 100"
              style={styles.input}
            />
            {/* Dosage Unit Dropdown */}
            <select
              id="doseUnit"
              name="doseUnit"
              value={medicineData.dosageUnit}
              onChange={handleDosageUnitChange}
              style={styles.select}
            >
              <option value="mg">mg</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="mcg">mcg</option>
            </select>
          </div>
        </div>

        {/* Special Instructions Input */}
        <div style={styles.field}>
          <label style={styles.label}>Special Instruction</label>
          <input
            type="text"
            id="specialInstruction"
            name="specialInstruction"
            value={medicineData.specialInstruction}
            onChange={handleSpecialInstructionChange}
            placeholder="Ex. Take after breakfast"
            style={styles.input}
          />
        </div>

        {/* Stock Quantity Selection */}
        <div style={styles.field}>
          <label style={styles.label}>
            How many doses do you currently have left in stock?
          </label>
          <select
            id="stock"
            name="stock"
            value={medicineData.stock}
            onChange={handleStockChange}
            style={styles.select}
          >
            {/* Dynamically generate options from 1 to 50 */}
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

// Styles object with consistent styling across the component
// Uses flexbox and grid for responsive layout
const styles: { [key: string]: React.CSSProperties } = {
  // Main container with two-column layout
  cardBody: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "24px", // Space between left and right halves
  },
  // Left half of the form
  lefthalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "24px", // Vertical spacing between fields
  },
  // Right half of the form
  rightHalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "24px", // Vertical spacing between fields
  },
  // Consistent field styling
  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px", // Space between label and input
    width: "100%",
  },
  // Label styling
  label: {
    fontSize: "16px",
    textAlign: "left",
    fontWeight: "500",
  },
  // Input field styling
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
  // Radio button container styling
  radioFieldContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  // Radio button label styling
  radioLabel: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
  },
  // Radio button styling
  radio: {
    cursor: "pointer",
    marginRight: "8px",
    marginTop: "6px",
  },
  // Dosage input container styling
  dosageInputContainer: {
    display: "flex",
    width: "100%",
    gap: "8px", // Space between dosage value and unit
  },
  // Select dropdown styling
  select: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  // Color selection container styling
  colorContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gap: "8px", // Space between color options
  },
  // Individual color shape styling
  colorShapes: {
    width: "32px",
    height: "32px",
    cursor: "pointer",
    borderRadius: "50%", // Circular shape
  },
};
