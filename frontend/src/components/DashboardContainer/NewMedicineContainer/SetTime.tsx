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
    if (event.key === "Enter") {
      const value = parseInt((event.target as HTMLInputElement).value);
      if (!isNaN(value) && value > 0) {
        setSelectedFrequency(value);
        setIsCustomFrequency(true);
      }
    }
  };

  const handleTimeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTimes = [...timesPerDay];
    const timeValue = event.target.value;
    updatedTimes[index] = `${timeValue}:00`;
    setTimesPerDay(updatedTimes);
  };

  React.useEffect(() => {
    setMedicineData({
      ...medicineData,
      timingFrequency: selectedFrequency,
      timesPerDay: timesPerDay,
      customTimingFrequency: isCustomFrequency ? selectedFrequency : "",
    });
  }, [selectedFrequency, timesPerDay]);

  return (
    <div style={styles.cardBody}>
      <div style={styles.lefthalf}>
        <div style={styles.field}>
          <label style={styles.label}>
            How many times should the medication be taken in a day?
          </label>
          <select
            value={isCustomFrequency ? 5 : selectedFrequency}
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

        <div style={styles.field}>
          <label style={styles.label}>Specify the number of times</label>
          <input
            type="number"
            style={{
              ...styles.input,
              opacity: isCustomFrequency ? 1 : 0.5,
            }}
            disabled={!isCustomFrequency}
            onKeyDown={handleCustomFrequencyKeyPress}
          />
        </div>
      </div>

      <div style={styles.rightHalf}>
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
                value={timesPerDay[index] || ""}
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
