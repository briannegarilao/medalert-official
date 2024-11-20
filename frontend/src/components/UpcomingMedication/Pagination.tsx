interface PaginationProps {
  currentPage: number;
  totalDays: number;
  displayedDates: string[];
  selectedDate: number | null;
  onPageChange: (direction: "next" | "prev") => void;
  onDateClick: (date: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  displayedDates,
  selectedDate,
  onPageChange,
  onDateClick,
}) => {
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: 0 }}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => onPageChange("prev")}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {/* Render dates */}
          {displayedDates.map((date) => (
            <li
              key={date}
              className={`page-item ${
                date === String(selectedDate) ? "active" : ""
              }`}
              onClick={() => onDateClick(date)}
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
              onClick={() => onPageChange("next")}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
