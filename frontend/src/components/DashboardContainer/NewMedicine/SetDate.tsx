import { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar
import "./CalendarStyles.css"; // Import custom styles for highlights

// TODO: Make sure everything have data

// TypeScript interface defining the props for the SetDate component
// This ensures type safety for the component's input parameters
interface SetDateProps {
  medicineData: {
    startDate: Date | null;
    endDate: Date | null;
    dateFrequency: string;
    customDateFrequency: string;
  };
  setMedicineData: React.Dispatch<React.SetStateAction<any>>;
}

function SetDate({ medicineData, setMedicineData }: SetDateProps) {
  // State hooks to manage different aspects of medication scheduling
  // Initialize states with existing medicineData or null/default values
  const [startDate, setStartDate] = useState<Date | null>(
    medicineData.startDate
  );
  const [endDate, setEndDate] = useState<Date | null>(medicineData.endDate);
  const [frequency, setFrequency] = useState<string>(
    medicineData.dateFrequency
  );
  const [customFrequency, setCustomFrequency] = useState<string>(
    medicineData.customDateFrequency
  );

  // useEffect hook to update parent component's medicineData
  // whenever local state changes (start date, end date, frequency)
  useEffect(() => {
    const highlightedDates = getHighlightedDates();
    setMedicineData({
      ...medicineData,
      startDate,
      endDate,
      dateFrequency: frequency,
      customDateFrequency: customFrequency,
      datesToTake: highlightedDates, // Update `datesToTake` in the parent
    });
  }, [startDate, endDate, frequency, customFrequency]);

  // Validate and handle changes to start and end dates
  // Prevents illogical date ranges (end date before start date)
  const onDateChange = (
    type: "start" | "end",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(event.target.value);

    // Additional validation to ensure date consistency
    if (type === "start" && endDate && date > endDate) {
      alert("Start date cannot be after the end date.");
      return;
    }
    if (type === "end" && startDate && date < startDate) {
      alert("End date cannot be before the start date.");
      return;
    }

    // Update the appropriate date state
    type === "start" ? setStartDate(date) : setEndDate(date);
  };

  // Handle changes in medication frequency dropdown
  const onFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(event.target.value);
  };

  // Handle custom frequency input
  // Only allows numeric input to ensure valid interval
  const onCustomFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) setCustomFrequency(value);
  };

  // Format date to be compatible with HTML date input (YYYY-MM-DD)
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Complex logic to generate highlighted dates based on selected frequency
  const getHighlightedDates = (): Date[] => {
    if (!startDate || !endDate) return [];

    const highlightedDates: Date[] = [];
    let current = new Date(startDate);

    // Different logic for each frequency type
    switch (frequency) {
      case "1": // Daily - highlight every single day
        while (current <= endDate) {
          highlightedDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
        break;

      case "2": // Every Other Day - highlight every 2nd day
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
          current.setDate(current.getDate() + 1);
        }
        break;

      case "4": // Custom Frequency - user-defined interval
        const interval = parseInt(customFrequency, 10);
        if (!customFrequency || isNaN(interval) || interval <= 0) {
          return []; // Invalid custom frequency
        }
        while (current <= endDate) {
          highlightedDates.push(new Date(current));
          current.setDate(current.getDate() + interval);
        }
        break;

      default:
        break;
    }

    return highlightedDates;
  };

  // Use useMemo to optimize performance
  // Converts highlighted dates to a Set for efficient lookup
  const highlightedDatesSet = useMemo(
    () => new Set(getHighlightedDates().map((d) => d.toDateString())),
    [startDate, endDate, frequency, customFrequency]
  );

  // Get today's date for special styling
  const today = new Date();

  return (
    <div style={styles.cardBody}>
      {/* Left section: Frequency and Date Inputs */}
      <div style={styles.leftHalf}>
        {/* Frequency Selection Dropdown */}
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

        {/* Conditional Custom Frequency Input */}
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

      {/* Right section: Calendar View */}
      <div style={styles.rightHalf}>
        <div style={styles.calendarContainer}>
          <Calendar
            selectRange={false}
            // Dynamic tile className for highlighting specific dates
            tileClassName={({ date }) => {
              const todayString = today.toDateString();
              // Special styling for today's date
              if (date.toDateString() === todayString) return "current-day";
              // Highlight dates based on selected frequency
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
