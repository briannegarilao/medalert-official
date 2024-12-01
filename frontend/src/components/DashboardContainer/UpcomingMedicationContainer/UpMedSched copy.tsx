import { useState, useEffect, ChangeEvent } from "react";
import { db } from "../../../../firebaseConfig"; // Import Firestore database instance
import { collection, getDocs, query, where } from "firebase/firestore";

import MonthSelect from "./MonthSelect"; // Custom component for month selection
import Pagination from "./Pagination"; // Custom component for pagination
import MedicationCard from "./MedicationCard"; // Component to display medication details
import Colors from "../../../theme/Colors"; // Import color constants

function UpMedSched() {
  // State variables to manage data and UI
  const [selectedMonth, setSelectedMonth] = useState<string>("Nov 2024"); // Currently selected month (default: Nov 2024)
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const [daysInMonth, setDaysInMonth] = useState<string[]>([]); // List of all days in the selected month
  const [selectedDate, setSelectedDate] = useState<number | null>(null); // Selected date (default: null)
  const [medications, setMedications] = useState<any[]>([]); // List of medications fetched from Firestore

  // Function to generate an array of days in the selected month
  const generateDays = (month: string): string[] => {
    const [monthName, yearNumber] = month.split(" "); // Split the month into name and year
    const monthIndex = new Date(`${monthName} 1, ${yearNumber}`).getMonth(); // Get the zero-based index of the month
    const numDays = new Date(Number(yearNumber), monthIndex + 1, 0).getDate(); // Get the total number of days in the month
    const daysArray = Array.from({ length: numDays }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ); // Create an array of days (formatted as "01", "02", ...)
    return daysArray;
  };

  // Get the dates to display on the current page of the pagination
  const getPageDates = () => {
    const startIndex = (currentPage - 1) * 5; // Calculate the starting index based on the current page
    return daysInMonth.slice(startIndex, startIndex + 5); // Return a slice of 5 dates for the current page
  };

  // Handle changes in pagination (next/previous page)
  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage * 5 < daysInMonth.length) {
      setCurrentPage(currentPage + 1); // Go to the next page
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to the previous page
    }
  };

  // Handle month selection changes
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value); // Update the selected month
    setCurrentPage(1); // Reset to the first page
  };

  // Handle date selection (when a specific date is clicked)
  const handleDateClick = (date: string) => {
    setSelectedDate(Number(date)); // Update the selected date
  };

  // Fetch medication data from Firestore for the selected month
  const fetchMedications = async () => {
    const medicationsCollection = collection(db, "medications"); // Get the Firestore collection named "medications"
    const monthQuery = query(
      medicationsCollection,
      where("month", "==", selectedMonth) // Query medications for the selected month
    );

    try {
      const querySnapshot = await getDocs(monthQuery); // Execute the query
      if (!querySnapshot.empty) {
        const medicationsArray = querySnapshot.docs.map((doc) => doc.data()); // Extract the data from the documents
        setMedications(medicationsArray); // Update the medications state
      } else {
        setMedications([]); // If no documents are found, set medications to an empty array
      }
    } catch (error) {
      console.error("Error fetching medications:", error); // Log any errors
    }
  };

  // Effect to generate the list of days whenever the selected month changes
  useEffect(() => {
    setDaysInMonth(generateDays(selectedMonth)); // Update the days for the selected month
    setSelectedDate(new Date().getDate()); // Set the current date as the default selected date
  }, [selectedMonth]);

  // Effect to fetch medications whenever the selected month changes
  useEffect(() => {
    fetchMedications(); // Fetch medications for the selected month
  }, [selectedMonth]);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Upcoming Medication Schedule</h2>

      <MonthSelect
        selectedMonth={selectedMonth}
        onMonthChange={handleSelectChange}
      />

      <Pagination
        currentPage={currentPage}
        totalDays={daysInMonth.length} // Total number of days in the selected month
        onPageChange={handlePageChange} // Handle next/prev actions
        onDateClick={handleDateClick} // Handle date selection
        displayedDates={getPageDates()} // Dates to display on the current page
        selectedDate={selectedDate} // Currently selected date
      />

      <div>
        {medications.length === 0 ? (
          <div>
            <p>No medications scheduled for today.</p>
            <p>Tap "Add Medicine" to get started!</p>
          </div>
        ) : (
          medications.map((item, index) => (
            <MedicationCard key={index} {...item} />
          ))
        )}
      </div>
    </div>
  );
}

export default UpMedSched;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    height: "100%",
    padding: "1rem",
    borderRadius: 8,
    border: `1px solid ${Colors.gray00}`,
    boxShadow: `0 4px 8px ${Colors.gray00}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
};
