import React, { ChangeEvent, useMemo } from "react";
import Colors from "../../../theme/Colors";

interface DateSelectorProps {
  selectedDate: string; // ISO date string (e.g., "2024-12-02")
  onDateChange: (date: string) => void; // Return updated ISO date
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Parse the ISO date string into components
  const date = new Date(selectedDate);
  const selectedYear = date.getFullYear();
  const selectedMonth = date.getMonth(); // 0-indexed
  const selectedDay = date.getDate();

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() + i
  );

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedMonth, selectedYear]);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handlers
  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedDate = new Date(
      selectedYear,
      parseInt(e.target.value, 10),
      selectedDay
    );
    // Format the date as a local YYYY-MM-DD string
    const localDateString = updatedDate.toLocaleDateString("en-CA");
    onDateChange(localDateString);
  };

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedDate = new Date(
      selectedYear,
      selectedMonth,
      parseInt(e.target.value, 10)
    );
    const localDateString = updatedDate.toLocaleDateString("en-CA");
    onDateChange(localDateString);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedDate = new Date(
      parseInt(e.target.value, 10),
      selectedMonth,
      selectedDay
    );
    const localDateString = updatedDate.toLocaleDateString("en-CA");
    onDateChange(localDateString);
  };

  return (
    <div style={styles.container}>
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        style={styles.select}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select
        value={selectedDay}
        onChange={handleDayChange}
        style={styles.select}
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        value={selectedYear}
        onChange={handleYearChange}
        style={styles.select}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    gap: 8,
  },
  select: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: Colors.blue01,
    color: Colors.white00,
  },
};
