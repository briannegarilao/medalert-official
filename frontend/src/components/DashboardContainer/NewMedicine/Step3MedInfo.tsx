import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar

function SetDate() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState<string>("1"); // Default to "Daily"
  const [customFrequency, setCustomFrequency] = useState<string>(""); // For "Others, please specify"

  const onDateChange = (
    type: "start" | "end",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(event.target.value); // Convert to Date object
    if (type === "start") setStartDate(date);
    if (type === "end") setEndDate(date);
  };

  const onFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(event.target.value);
  };

  const onCustomFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomFrequency(event.target.value);
  };

  // Function to format the date as YYYY-MM-DD
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to calculate the highlighted dates based on the frequency
  const getHighlightedDates = () => {
    if (!startDate || !endDate) return [];

    const highlightedDates: Date[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date(start);

    while (current <= end) {
      if (frequency === "1") {
        highlightedDates.push(new Date(current));
      } else if (frequency === "2" && current.getDate() % 2 === 0) {
        highlightedDates.push(new Date(current));
      } else if (frequency === "3") {
        const dayOfWeek = current.getDay();
        if (dayOfWeek === 1 || dayOfWeek === 4) {
          highlightedDates.push(new Date(current));
        }
      } else if (frequency === "4" && customFrequency) {
        const interval = parseInt(customFrequency);
        if (
          !isNaN(interval) &&
          (current.getDate() - start.getDate()) % interval === 0
        ) {
          highlightedDates.push(new Date(current));
        }
      }
      current.setDate(current.getDate() + 1);
    }

    return highlightedDates;
  };

  // Get today's date for outline styling
  const today = new Date();

  return (
    <div style={styles.cardBody}>
      {/* LEFT HALF */}
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

        {frequency === "4" && (
          <div style={styles.field}>
            <label style={styles.label}>
              Please specify the frequency (Ex. every 3 days)
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

      {/* RIGHT HALF */}
      <div style={styles.rightHalf}>
        <div style={styles.calendarContainer}>
          <Calendar
            selectRange={false}
            tileClassName={({ date }) => {
              const highlightedDates = getHighlightedDates();
              if (date.toDateString() === today.toDateString()) {
                return "current-day";
              }
              return highlightedDates.some(
                (d) => d.toDateString() === date.toDateString()
              )
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
