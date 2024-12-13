import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Module from "../ModuleCards/Module";
import Colors from "../../theme/Colors";

type HistoryLog = {
  date: string;
  time: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  status: string;
};

const HistoryContainer: React.FC = () => {
  const [historyLogs, setHistoryLogs] = useState<HistoryLog[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchHistoryLogs = async () => {
      const medicationsCollection = collection(
        db,
        "Users/userId_0001/Medications"
      );
      const querySnapshot = await getDocs(medicationsCollection);
      const logs: HistoryLog[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.history) {
          logs.push(...data.history);
        }
      });

      setHistoryLogs(logs);
    };

    fetchHistoryLogs();
  }, []);

  const totalPages = Math.ceil(historyLogs.length / itemsPerPage);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = historyLogs.slice(startIndex, endIndex);

  return (
    <Module title="Medication History">
      <div style={styles.container}>
        <div>
          {/* Table Headers */}
          <div style={styles.row}>
            <HeaderCell title="Date" />
            <HeaderCell title="Time" />
            <HeaderCell title="Medicine Name" />
            <HeaderCell title="Dosage" />
            <HeaderCell title="Frequency" />
            <HeaderCell title="Status" />
          </div>
          {/* Table Data */}
          {currentData.map((log, index) => (
            <div style={styles.row} key={index}>
              <DataCell content={log.date} />
              <DataCell content={log.time} />
              <DataCell content={log.medicineName} />
              <DataCell content={log.dosage} />
              <DataCell content={log.frequency} />
              <DataCell content={log.status} />
            </div>
          ))}
        </div>
        <div>
          {/* Pagination Controls */}
          <div style={styles.paginationContainer}>
            <div style={styles.paginationGroup}>
              <label style={styles.label}>
                Items per page:
                <select
                  style={styles.select}
                  onChange={handleItemsPerPageChange}
                  value={itemsPerPage}
                >
                  {[1, 5, 10, 20, 50, 100].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={styles.paginationGroup}>
              <label style={styles.label}>
                Page:
                <select
                  style={styles.select}
                  onChange={handlePageChange}
                  value={currentPage}
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <span> of {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </Module>
  );
};

const HeaderCell: React.FC<{ title: string }> = ({ title }) => (
  <div style={styles.headerCell}>{title.toUpperCase()}</div>
);

const DataCell: React.FC<{ content: string | number }> = ({ content }) => (
  <div style={styles.dataCell}>{content}</div>
);

export default HistoryContainer;

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerCell: {
    width: "100%",
    backgroundColor: Colors.blue00,
    padding: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    border: "1px solid #ccc",
  },
  dataCell: {
    width: "100%",
    padding: 16,
    textAlign: "center",
    fontSize: 16,
    border: "1px solid #ccc",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
  },
  paginationGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  select: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};
