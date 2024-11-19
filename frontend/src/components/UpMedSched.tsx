import { useState, useEffect, ChangeEvent } from "react";



function UpMedSched() {

        // State to manage selected month and year
        const [selectedMonth, setSelectedMonth] = useState<string>("Nov 2024");
        // State to manage current date pagination (5 dates at a time)
        const [currentPage, setCurrentPage] = useState(1);
        // State to store the list of days for the selected month/year
        const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
        const [selectedDate, setSelectedDate] = useState<number | null>(null);
      
        // Generate dates based on the selected month/year
        const generateDays = (month: string): number[] => {
            const [monthName, yearNumber] = month.split(" ");
            const monthIndex = new Date(`${monthName} 1, ${yearNumber}`).getMonth(); // monthIndex as 0-based
            const numDays = new Date(Number(yearNumber), monthIndex + 1, 0).getDate(); // Use yearNumber for proper date calculations
            const daysArray = Array.from({ length: numDays }, (_, i) => i + 1); // Generate days array
            return daysArray;
        };
          
      
        // Calculate the pagination based on currentPage
        const getPageDates = () => {
          const startIndex = (currentPage - 1) * 5;
          const endIndex = startIndex + 5;
          return daysInMonth.slice(startIndex, endIndex);
        };
      
        // Handle the page change (next/previous)
        const handlePageChange = (direction: "next" | "prev") => {
            if (direction === "next" && currentPage * 5 < daysInMonth.length) {
              setCurrentPage(currentPage + 1);
            } else if (direction === "prev" && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          };
          
      
        // Handle the month/year change from the select input
        const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedMonth(e.target.value);
            setCurrentPage(1); // Reset to the first page when the month/year is changed
          };
      
        // Select the date when clicked
        const handleDateClick = (date: number) => {
            setSelectedDate(date);
          };
          
      
        // Initialize the days for the selected month/year
        useEffect(() => {
          setDaysInMonth(generateDays(selectedMonth));
          setSelectedDate(new Date().getDate()); // Set the current date as selected
        }, [selectedMonth]);
      


    const mockData = [
        {
            medicationName: "Aspirin",
            time: "08:15-12:00",
            dose: "1 tablet",
            instruction: "Take with food",
            borderColor: "#B7DF69", // Example green border for stock available
        },
        {
            medicationName: "Ibuprofen",
            time: "10:00-14:00",
            dose: "1 tablet",
            instruction: "Take with water",
            borderColor: "#FF6F61", // Example red border for out of stock
        },
        {
            medicationName: "Paracetamol",
            time: "12:00-16:00",
            dose: "1 tablet",
            instruction: "Take every 4 hours",
            borderColor: "#A6AEBF", // Example green border for stock available
        },
        {
            medicationName: "Vitamin C",
            time: "14:00-18:00",
            dose: "2 tablets",
            instruction: "Take after meal",
            borderColor: "#A723B9", // Example green border for stock available
        }
    ];

    

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
            style={{
              fontSize: 20,
              marginBottom: "20px", // Optional, to create space between the title and the rest of the content
            }}
          >
            Upcoming Medication Schedule
          </h2>

          <div className="mb-3" style={{ maxWidth: 100 }}>
            <select
              className="form-select"
              id="year"
              name="year"
              value={selectedMonth}
              onChange={handleSelectChange}
            >
              <option value="Nov 2024">Nov 2024</option>
              <option value="Dec 2024">Dec 2024</option>
              <option value="Jan 2025">Jan 2025</option>
              <option value="Feb 2025">Feb 2025</option>
              {/* Add more months here */}
            </select>
          </div>

          <div className="d-flex justify-content-center" style={{ marginTop: 0 }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange("prev")}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {/* Render dates */}
                {getPageDates().map((date) => (
                  <li
                    key={date}
                    className={`page-item ${date === selectedDate ? "active" : ""}`}
                    onClick={() => handleDateClick(date)}
                  >
                    <a className="page-link" href="#">
                      {date}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange("next")}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="container" style={{ maxHeight: "350px", overflowY: "auto", overflowX: "hidden", paddingRight: "0.5rem" }}>
              {mockData.map((item, index) => (
                  <div key={index} className="card" style={{marginBottom: 5}}>
                      <div className="card-body" style={{
                          position: 'relative',
                          borderLeft: `7px solid ${item.borderColor}`,
                          backgroundColor: "#DFEEBA",
                      }}>
                          <div className="d-flex justify-content-between">
                              <label><h3 style={{ fontSize: 16 }}>{item.medicationName}</h3></label>
                              <p style={{ margin: "0", fontSize: 15, textAlign: 'right', color: "red" }}>{item.time}</p>
                          </div>
                          <p style={{ margin: "0", fontSize: 14, color: "gray" }}>Dose: {item.dose}</p>
                          <p style={{ margin: "0", fontSize: 14, color: "gray" }}>Instruction: {item.instruction}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </div>

    );
  }
  
  export default UpMedSched;