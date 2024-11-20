import { useState, useEffect, ChangeEvent } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import MonthSelect from "./MonthSelect";
import Pagination from "./Pagination";
import MedicationCard from "./MedicationCard";

function UpMedSched() {
  const [selectedMonth, setSelectedMonth] = useState<string>("Nov 2024");
  const [currentPage, setCurrentPage] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [medications, setMedications] = useState<any[]>([]);

  // Generate days in the selected month, formatted with leading zeros
  const generateDays = (month: string): string[] => {
    const [monthName, yearNumber] = month.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${yearNumber}`).getMonth(); // monthIndex as 0-based
    const numDays = new Date(Number(yearNumber), monthIndex + 1, 0).getDate(); // Get number of days in the month
    const daysArray = Array.from({ length: numDays }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ); // Format days with leading zeros
    return daysArray;
  };

  const getPageDates = () => {
    const startIndex = (currentPage - 1) * 5;
    return daysInMonth.slice(startIndex, startIndex + 5);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage * 5 < daysInMonth.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(Number(date));
  };

  // Fetch medication data from Firestore
  const fetchMedications = async () => {
    const medicationsCollection = collection(db, "medications"); // Get the medications collection
    const monthQuery = query(
      medicationsCollection,
      where("month", "==", selectedMonth)
    ); // Query for the selected month

    try {
      const querySnapshot = await getDocs(monthQuery);
      if (!querySnapshot.empty) {
        const medicationsArray = querySnapshot.docs.map((doc) => doc.data());
        setMedications(medicationsArray);
      } else {
        setMedications([]); // No medications found
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  useEffect(() => {
    setDaysInMonth(generateDays(selectedMonth));
    setSelectedDate(new Date().getDate()); // Set the current date as selected
  }, [selectedMonth]);

  useEffect(() => {
    fetchMedications(); // Fetch medications whenever the month is selected or changed
  }, [selectedMonth]);

  return (
    <div
      className="card shadow"
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "550px",
        padding: "1rem",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <h2
          className="card-title text-center"
          style={{ fontSize: 20, marginBottom: "20px" }}
        >
          Upcoming Medication Schedule
        </h2>

        <MonthSelect
          selectedMonth={selectedMonth}
          onMonthChange={handleSelectChange}
        />
        <Pagination
          currentPage={currentPage}
          totalDays={daysInMonth.length}
          onPageChange={handlePageChange}
          onDateClick={handleDateClick}
          displayedDates={getPageDates()}
          selectedDate={selectedDate}
        />

        <div
          className="container"
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "0.5rem",
          }}
        >
          {medications.length === 0 ? (
            // Display this message when no medications are found for the selected date
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
    </div>
  );
}

export default UpMedSched;
