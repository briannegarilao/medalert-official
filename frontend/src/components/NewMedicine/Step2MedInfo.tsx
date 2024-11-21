import { useState } from "react";
import "../../App.css";

function SetTime() {
  const [specification, setSpecification] = useState(false);
  const [count, setCount] = useState(0);

  const amPmOptions = ["AM", "PM"];

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
    const selectedValue = parseInt(event.target.value);

    if (selectedValue === 5) {
      // "Others, please specify" selected, show input for custom count
      setSpecification(true);
      setCount(0); // Reset count until specified
    } else {
      setSpecification(false);
      setCount(selectedValue); // Set count based on predefined options
    }
  };

  const handleCustomCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customCount = parseInt(event.target.value) || 0;
    setCount(customCount); // Update count based on user input
  };

  return (
    <div
      className="card-body"
      style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
    >
      <div className="row mb-3">
        <label htmlFor="frequency" className="form-label">
          How many times should the medication be taken in a day?
        </label>
        <select
          className="form-select"
          id="frequency"
          name="frequency"
          onChange={handleFrequencyChange}
        >
          {frequencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="row mb-3">
        {specification && (
          <div className="mt-3">
            <label htmlFor="customCount" className="form-label">
              Specify the number of times
            </label>
            <input
              type="number"
              className="form-control"
              id="customCount"
              name="customCount"
              min="1"
              onChange={handleCustomCountChange}
            />
          </div>
        )}

        {[...Array(count)].map((_, index) => (
          <div key={index} className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter time"
              aria-label="Time input"
            />
            <select className="form-select" aria-label="AM/PM selector">
              {amPmOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetTime;
