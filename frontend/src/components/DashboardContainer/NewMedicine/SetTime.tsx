import { useState } from "react";
import Colors from "../../../theme/Colors";
import React from "react";

function SetTime({ medicineData, setMedicineData }: any) {
  const [selectedFrequency, setSelectedFrequency] = useState(
    medicineData.timingFrequency
  );

  const [isCustomFrequency, setIsCustomFrequency] = useState(false);

  const [timesPerDay, setTimesPerDay] = useState(medicineData.timesPerDay);

  const frequencyOptions = [
    { value: 1, label: "Once a Day" },
    { value: 2, label: "Twice a Day" },
    { value: 3, label: "Three Times a Day" },
    { value: 4, label: "Four Times a Day" },
    { value: 5, label: "Others, please specify" },
  ];

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value);
    setSelectedFrequency(value);
    setIsCustomFrequency(value === 5);
    setTimesPerDay([]);
  };

  const handleCustomFrequencyKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Check if Enter key is pressed
    if (event.key === "Enter") {
      // Parse the input value
      const value = parseInt((event.target as HTMLInputElement).value);

      // Validate the input
      if (!isNaN(value) && value > 0) {
        // Set the custom frequency
        setSelectedFrequency(value);
        setIsCustomFrequency(true);
        console.log("Custom frequency entered and set:", value);
      } else {
        console.log("Invalid frequency value entered.");
      }
    }
  };

  // Handler for time selection changes
  const handleTimeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Create a copy of existing times
    const updatedTimes = [...timesPerDay];

    // Update the time at the specific index
    updatedTimes[index] = event.target.value;

    // Update the state with new times
    setTimesPerDay(updatedTimes);
  };

  // Effect to update parent component's state whenever frequency or times change
  React.useEffect(() => {
    setMedicineData({
      // Spread existing medicine data
      ...medicineData,

      // Update timing frequency
      timingFrequency: selectedFrequency,

      // Update times per day
      timesPerDay: timesPerDay,

      // Set custom timing frequency if applicable
      customTimingFrequency: isCustomFrequency ? selectedFrequency : "",
    });
  }, [selectedFrequency, timesPerDay]);

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF: Frequency Selection */}
      <div style={styles.lefthalf}>
        {/* Frequency Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>
            How many times should the medication be taken in a day?
          </label>
          <select
            // Use 5 (custom option) if it's a custom frequency
            value={isCustomFrequency ? 5 : selectedFrequency}
            onChange={handleFrequencyChange}
            style={styles.select}
          >
            {/* Dynamically render frequency options */}
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
              // Adjust opacity based on custom frequency selection
              ...styles.input,
              opacity: isCustomFrequency ? 1 : 0.5,
            }}
            // Disable input if not in custom mode
            disabled={!isCustomFrequency}
            // Handle custom frequency input
            onKeyDown={handleCustomFrequencyKeyPress}
          />
        </div>
      </div>

      {/* RIGHT HALF: Time Selection */}
      <div style={styles.rightHalf}>
        <div style={styles.scrollableContainer}>
          {/* Dynamically generate time inputs based on frequency */}
          {[
            // Create an array with length equal to selected frequency
            ...Array(isCustomFrequency ? selectedFrequency : selectedFrequency),
          ].map((_, index) => (
            <div key={index} style={styles.field}>
              <label style={styles.label}>Select Time {index + 1}</label>
              <input
                type="time"
                className="form-control"
                style={styles.timePicker}
                // Use existing time if available, otherwise empty string
                value={timesPerDay[index] || ""}
                // Handle time change for each input
                onChange={(event) => handleTimeChange(index, event)}
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
    display: "flex",
    flexDirection: "row",
    gap: "24px",
  },
  lefthalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  rightHalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  scrollableContainer: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "300px",
    overflowY: "auto",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "16px",
  },
  select: {
    padding: "8px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
  },
  timePicker: {
    padding: "8px",
  },
  navButton: {
    padding: "10px",
    backgroundColor: Colors.blue01,
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
