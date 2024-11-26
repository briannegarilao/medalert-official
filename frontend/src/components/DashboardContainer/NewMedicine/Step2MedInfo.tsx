import { useState } from "react";
import Colors from "../../../theme/Colors";

function SetTime() {
  const [selectedFrequency, setSelectedFrequency] = useState(1); // Track selected frequency
  const [isCustomFrequency, setIsCustomFrequency] = useState(false); // Track if custom frequency is used

  const frequencyOptions = [
    { value: 1, label: "Once a Day" },
    { value: 2, label: "Twice a Day" },
    { value: 3, label: "Three Times a Day" },
    { value: 4, label: "Four Times a Day" },
    { value: 5, label: "Others, please specify" }, // "Others" option with value 5
  ];

  // Handle the frequency selector change
  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value);
    setSelectedFrequency(value);
    setIsCustomFrequency(value === 5); // Set custom flag only if "Others" is selected
  };

  // Handle the "Enter" keypress in the custom frequency input
  const handleCustomFrequencyKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = parseInt((event.target as HTMLInputElement).value);
      if (!isNaN(value) && value > 0) {
        setSelectedFrequency(value); // Update the selected frequency with the entered value
        setIsCustomFrequency(true); // Indicate custom frequency is active
        console.log("Custom frequency entered and set:", value);
      } else {
        console.log("Invalid frequency value entered.");
      }
    }
  };

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF */}
      <div style={styles.lefthalf}>
        {/* Frequency Selection */}
        <div style={styles.field}>
          <label style={styles.label}>
            How many times should the medication be taken in a day?
          </label>
          <select
            value={isCustomFrequency ? 5 : selectedFrequency} // Show "Others" if custom is active
            onChange={handleFrequencyChange} // Handle changes
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
        <div style={styles.field}>
          <label style={styles.label}>Specify the number of times</label>
          <input
            type="number"
            style={{
              ...styles.input,
              opacity: isCustomFrequency ? 1 : 0.5, // 50% transparency when not active
            }}
            disabled={!isCustomFrequency} // Disable unless "Others" is selected
            onKeyDown={handleCustomFrequencyKeyPress} // Attach the keydown handler
          />
        </div>
      </div>

      {/* RIGHT HALF */}
      <div style={styles.rightHalf}>
        {/* Scrollable Container for Dynamic Time Inputs */}
        <div style={styles.scrollableContainer}>
          {[
            ...Array(isCustomFrequency ? selectedFrequency : selectedFrequency),
          ].map((_, index) => (
            <div key={index} style={styles.field}>
              <label style={styles.label}>Select Time {index + 1}</label>
              <input
                type="time"
                className="form-control"
                style={styles.timePicker}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SetTime;

const styles: { [key: string]: React.CSSProperties } = {
  cardBody: {
    width: "100%",
    maxHeight: "100%",
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
  scrollableContainer: {
    maxHeight: "400px", // Limit the container height
    overflowY: "auto", // Enable vertical scrolling
    paddingRight: "8px", // Add padding for better UX
    borderRadius: "4px",
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
    textAlign: "left",
  },
  input: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
    padding: "8px 16px",
  },
  select: {
    width: "100%",
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    padding: "8px",
  },
  timePicker: {
    border: `1px solid ${Colors.gray00}`,
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
    padding: "8px 16px",
  },
};
