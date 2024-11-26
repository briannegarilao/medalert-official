import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar
import "./CalendarStyles.css"; // Import custom styles for highlights

function SetDate() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState<string>("1"); // Default to "Daily"
  const [customFrequency, setCustomFrequency] = useState<string>(""); // For "Others, please specify"

  // Function to handle changes to start or end dates
  const onDateChange = (
    type: "start" | "end",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(event.target.value);
    // Validate that the start date is before the end date
    if (type === "start" && endDate && date > endDate) {
      alert("Start date cannot be after the end date.");
      return;
    }
    if (type === "end" && startDate && date < startDate) {
      alert("End date cannot be before the start date.");
      return;
    }
    type === "start" ? setStartDate(date) : setEndDate(date);
  };

  // Function to handle changes in frequency selection
  const onFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(event.target.value);
  };

  // Function to handle changes in custom frequency input
  const onCustomFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) setCustomFrequency(value); // Only accept numeric input
  };

  // Function to format dates as YYYY-MM-DD for input fields
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to calculate the highlighted dates based on frequency and date range
  const getHighlightedDates = (): Date[] => {
    if (!startDate || !endDate) return [];

    const highlightedDates: Date[] = [];
    let current = new Date(startDate);

    switch (frequency) {
      case "1": // Daily
        while (current <= endDate) {
          highlightedDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
        break;

      case "2": // Every Other Day
        while (current <= endDate) {
          highlightedDates.push(new Date(current));
          current.setDate(current.getDate() + 2);
        }
        break;

      case "3": // Twice a Week (Monday and Thursday)
        while (current <= endDate) {
          if (current.getDay() === 1 || current.getDay() === 4) {
            highlightedDates.push(new Date(current));
          }
          current.setDate(current.getDate() + 1); // Increment by 1 day
        }
        break;

      case "4": // Custom Frequency
        const interval = parseInt(customFrequency, 10);
        if (!customFrequency || isNaN(interval) || interval <= 0) {
          // Return an empty array if the custom frequency is invalid
          return [];
        }
        while (current <= endDate) {
          highlightedDates.push(new Date(current));
          current.setDate(current.getDate() + interval);
        }
        break;

      default:
        break; // No action for unhandled cases
    }

    return highlightedDates;
  };

  // Use useMemo to avoid recalculating highlighted dates unnecessarily
  const highlightedDatesSet = useMemo(
    () => new Set(getHighlightedDates().map((d) => d.toDateString())),
    [startDate, endDate, frequency, customFrequency]
  );

  // Today's date for special styling
  const today = new Date();

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF - Frequency and Date Inputs */}
      <div style={styles.leftHalf}>
        <div style={styles.field}>
          <label style={styles.label}>
            How frequent are you going to take your medication?
          </label>
          <select
            style={styles.select}
            value={frequency}
            onChange={onFrequencyChange}
          >
            {[
              "Daily",
              "Every Other Day",
              "Twice a Week",
              "Others, please specify",
            ].map((option, index) => (
              <option key={index} value={index + 1}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Show custom frequency input only for "Others" */}
        {frequency === "4" && (
          <div style={styles.field}>
            <label style={styles.label}>
              Please specify the frequency (e.g., every 3 days)
            </label>
            <input
              type="text"
              style={styles.input}
              value={customFrequency}
              onChange={onCustomFrequencyChange}
              placeholder="Ex. 3"
            />
          </div>
        )}

        {/* Date Range Inputs */}
        <div style={styles.dateContainer}>
          <div style={styles.dateField}>
            <label style={styles.label}>Start Date</label>
            <input
              type="date"
              style={styles.input}
              value={formatDateForInput(startDate)}
              onChange={(e) => onDateChange("start", e)}
            />
          </div>
          <div style={styles.dateField}>
            <label style={styles.label}>End Date</label>
            <input
              type="date"
              style={styles.input}
              value={formatDateForInput(endDate)}
              onChange={(e) => onDateChange("end", e)}
            />
          </div>
        </div>
      </div>

      {/* RIGHT HALF - Calendar */}
      <div style={styles.rightHalf}>
        <div style={styles.calendarContainer}>
          <Calendar
            selectRange={false}
            tileClassName={({ date }) => {
              const todayString = today.toDateString();
              if (date.toDateString() === todayString) return "current-day";
              return highlightedDatesSet.has(date.toDateString())
                ? "highlight"
                : null;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SetDate;

// Inline styles object for component
const styles: { [key: string]: React.CSSProperties } = {
  cardBody: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    width: "100%",
  },
  leftHalf: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "24px",
  },
  rightHalf: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    fontSize: "16px",
    width: "100%",
  },
  select: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    fontSize: "16px",
    width: "100%",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    width: "100%",
  },
  dateField: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "center",
  },
};
