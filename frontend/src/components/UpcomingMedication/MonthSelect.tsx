import { ChangeEvent } from "react";

interface MonthSelectProps {
  selectedMonth: string;
  onMonthChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const MonthSelect: React.FC<MonthSelectProps> = ({
  selectedMonth,
  onMonthChange,
}) => (
  <div className="mb-3" style={{ display: "inline-block" }}>
    <select
      className="form-select"
      id="year"
      name="year"
      value={selectedMonth}
      onChange={onMonthChange}
    >
      <option value="Nov 2024">Nov 2024</option>
      <option value="Dec 2024">Dec 2024</option>
      <option value="Jan 2025">Jan 2025</option>
      <option value="Feb 2025">Feb 2025</option>
      {/* Add more months here */}
    </select>
  </div>
);

export default MonthSelect;
