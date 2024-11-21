// Interface defining the expected props for the Pagination component
interface PaginationProps {
  currentPage: number; // The current page number
  totalDays: number; // Total number of days available for pagination
  displayedDates: string[]; // Array of dates to display on the current page
  selectedDate: number | null; // The currently selected date (can be null if no date is selected)
  onPageChange: (direction: "next" | "prev") => void; // Callback function to handle page changes (next or previous)
  onDateClick: (date: string) => void; // Callback function to handle date selection
}

// Functional component for Pagination
const Pagination: React.FC<PaginationProps> = ({
  displayedDates, // Dates to be displayed on the current page
  selectedDate, // The currently selected date
  onPageChange, // Callback for page navigation
  onDateClick, // Callback for date selection
}) => {
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: 0 }}>
      {/* Pagination navigation container */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Previous page button */}
          <li className="page-item">
            <a
              className="page-link"
              href="#" // Placeholder link
              aria-label="Previous" // Accessibility label for the previous button
              onClick={() => onPageChange("prev")} // Trigger callback to navigate to the previous page
            >
              <span aria-hidden="true">&laquo;</span>{" "}
              {/* Display left double arrow */}
            </a>
          </li>

          {/* Render each date as a page item */}
          {displayedDates.map((date) => (
            <li
              key={date} // Unique key for each date item
              className={`page-item ${
                date === String(selectedDate) ? "active" : "" // Highlight the selected date
              }`}
              onClick={() => onDateClick(date)} // Trigger callback when a date is clicked
            >
              <a className="page-link" href="#">
                {date} {/* Display the date */}
              </a>
            </li>
          ))}

          {/* Next page button */}
          <li className="page-item">
            <a
              className="page-link"
              href="#" // Placeholder link
              aria-label="Next" // Accessibility label for the next button
              onClick={() => onPageChange("next")} // Trigger callback to navigate to the next page
            >
              <span aria-hidden="true">&raquo;</span>{" "}
              {/* Display right double arrow */}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
