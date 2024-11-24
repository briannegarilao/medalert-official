import { useState, useEffect } from "react";
import Colors from "../../../theme/Colors";

// TODO: FIX THIS MOTHERFUCKING COMPONENT

function SetTime() {
  const [specification, setSpecification] = useState(false); // Whether the "Others" input is shown
  const [count, setCount] = useState(1); // Default count to "Once a Day"
  const [customCount, setCustomCount] = useState(1); // Custom count for "Others" input

  const amPmOptions = ["AM", "PM"];

  const frequencyOptions = [
    { value: 1, label: "Once a Day" },
    { value: 2, label: "Twice a Day" },
    { value: 3, label: "Three Times a Day" },
    { value: 4, label: "Four Times a Day" },
    { value: 5, label: "Others, please specify" },
  ];

  // Handles the change in frequency selection
  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = parseInt(event.target.value);

    if (selectedValue === 5) {
      setSpecification(true); // Show custom count input if "Others, please specify" is selected
      setCount(0); // Set count to 0, indicating custom input
    } else {
      setSpecification(false);
      setCount(selectedValue); // Use predefined frequency
    }
  };

  // Handles the change in custom count input
  const handleCustomCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customCountValue = parseInt(event.target.value) || 1; // Default to 1 if no input
    setCustomCount(customCountValue);
    setCount(customCountValue); // Set count to custom value for dynamic time inputs
  };

  // Effect to reset specification state if the frequency is set to "Once a Day"
  useEffect(() => {
    if (count === 1) {
      setSpecification(false); // Hide custom count input if frequency is "Once a Day"
      setCustomCount(1); // Reset custom count to 1
    }
  }, [count]);

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF */}
      <div style={styles.lefthalf}>
        {/* Frequency Selection */}
        <div style={styles.field}>
          <label htmlFor="frequency" style={styles.label}>
            How many times should the medication be taken in a day?
          </label>
          <select
            className="form-select"
            id="frequency"
            name="frequency"
            value={count === 0 ? 5 : count} // Show custom value if "Others" is selected
            onChange={handleFrequencyChange}
            style={styles.select}
          >
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Frequency Input */}
        {specification && (
          <div style={styles.field}>
            <label htmlFor="customCount" style={styles.label}>
              Specify the number of times
            </label>
            <input
              type="number"
              id="customCount"
              name="customCount"
              min="1"
              value={customCount} // Bind to custom count state
              onChange={handleCustomCountChange}
              style={styles.input}
            />
          </div>
        )}
      </div>

      {/* RIGHT HALF */}
      <div style={styles.rightHalf}>
        {/* Dynamic Time Inputs based on selected count */}
        {[...Array(count)].map((_, index) => (
          <div key={index} style={styles.field}>
            <div style={styles.dosageInputContainer}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter time"
                aria-label="Time input"
                style={styles.input}
              />
              <select
                className="form-select"
                aria-label="AM/PM selector"
                style={styles.select}
              >
                {amPmOptions.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetTime;

const styles: { [key: string]: React.CSSProperties } = {
  cardBody: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    width: "100%",
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
    fontWeight: "500",
  },
  input: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
    padding: "8px 16px",
  },
  select: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    padding: "8px",
  },
  dosageInputContainer: {
    display: "flex",
    gap: "8px",
    width: "100%",
  },
};
