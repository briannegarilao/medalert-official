// Import the ChangeEvent type for typing the onChange event handler
import { ChangeEvent } from "react";

// Define the props interface for the MonthSelect component
interface MonthSelectProps {
  selectedMonth: string; // Currently selected month (e.g., "Nov 2024")
  onMonthChange: (e: ChangeEvent<HTMLSelectElement>) => void; // Callback function triggered when the user selects a new month
}

// Functional component for selecting a month
const MonthSelect: React.FC<MonthSelectProps> = ({
  selectedMonth, // The currently selected month value
  onMonthChange, // Function to handle changes to the selected month
}) => (
  <div className="mb-3" style={{ display: "inline-block" }}>
    {/* Dropdown (select element) for month selection */}
    <select
      className="form-select" // Bootstrap styling for dropdown
      id="year" // ID for the select element (can be used for labels or testing)
      name="year" // Name attribute (useful for form submission if needed)
      value={selectedMonth} // Bind the selected value to the current state
      onChange={onMonthChange} // Trigger the callback when a new option is selected
    >
      {/* Dropdown options for months */}
      <option value="Nov 2024">Nov 2024</option>
      <option value="Dec 2024">Dec 2024</option>
      <option value="Jan 2025">Jan 2025</option>
      <option value="Feb 2025">Feb 2025</option>
      {/* Add more months here as needed */}
    </select>
  </div>
);

export default MonthSelect;
