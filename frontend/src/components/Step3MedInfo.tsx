import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Import default styles for the calendar

function SetDate() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [frequency, setFrequency] = useState<string>("1"); // Default to "Daily"
    const [customFrequency, setCustomFrequency] = useState<string>(""); // For "Others, please specify"

    const onDateChange = (type: "start" | "end", event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value); // Convert to Date object
        if (type === "start") setStartDate(date);
        if (type === "end") setEndDate(date);
    };

    const onFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFrequency(event.target.value);
    };

    const onCustomFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomFrequency(event.target.value);
    };

    // Function to format the date as YYYY-MM-DD
    const formatDateForInput = (date: Date | null): string => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to calculate the highlighted dates based on the frequency
    const getHighlightedDates = () => {
        if (!startDate || !endDate) return [];

        const highlightedDates: Date[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const current = new Date(start);

        // Calculate dates based on frequency
        while (current <= end) {
            if (frequency === "1") { // Daily
                highlightedDates.push(new Date(current));
            } else if (frequency === "2" && current.getDate() % 2 === 0) { // Every Other Day
                highlightedDates.push(new Date(current));
            } else if (frequency === "3" && current.getDay() === 1) { // Twice a Week (e.g., Mondays)
                highlightedDates.push(new Date(current));
            } else if (frequency === "4" && customFrequency) { // Custom frequency logic
                const interval = parseInt(customFrequency);
                if (!isNaN(interval) && current.getDate() % interval === 0) {
                    highlightedDates.push(new Date(current));
                }
            } else if (frequency === "3") { // Twice a Week: Highlight Monday and Thursday
                const dayOfWeek = current.getDay();
                if (dayOfWeek === 1 || dayOfWeek === 4) { // Monday (1) and Thursday (4)
                    highlightedDates.push(new Date(current));
                }
            }
            // Increment by 1 day for each iteration
            current.setDate(current.getDate() + 1);
        }

        return highlightedDates;
    };

    return (
        <div className="card-body" style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}>
            <div className="row mb-3">
                <label htmlFor="DayFrequency" className="form-label">
                    How frequent are you going to take your medication?
                </label>
                <select
                    className="form-select"
                    name="DayFrequency"
                    id="DayFrequency"
                    value={frequency}
                    onChange={onFrequencyChange}
                >
                    {["Daily", "Every Other Day", "Twice a Week", "Others, please specify"].map((option, index) => (
                        <option key={index} value={index + 1}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {frequency === "4" && (
                <div className="row mb-3">
                    <label htmlFor="CustomFrequency" className="form-label">
                        Please specify the frequency (Ex. every 3 days)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="CustomFrequency"
                        value={customFrequency}
                        onChange={onCustomFrequencyChange}
                        placeholder="Ex. 3"
                    />
                </div>
            )}

            <div className="row mb-3">
                <div className="input-group mb-3">
                    <span className="input-group-text">Start Date</span>
                    <input
                        type="date"
                        className="form-control"
                        value={formatDateForInput(startDate)}
                        onChange={(e) => onDateChange("start", e)}
                        aria-label="Start Date Input"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" style={{ width: "95px" }}>
                        End Date
                    </span>
                    <input
                        type="date"
                        className="form-control"
                        value={formatDateForInput(endDate)}
                        onChange={(e) => onDateChange("end", e)}
                        aria-label="End Date Input"
                    />
                </div>
            </div>

            <Calendar
                selectRange={false}
                tileClassName={({ date }) => {
                    const highlightedDates = getHighlightedDates();
                    return highlightedDates.some(
                        (d) => d.toDateString() === date.toDateString()
                    )
                        ? "highlight"
                        : null;
                }}
            />
        </div>
    );
}

export default SetDate;
