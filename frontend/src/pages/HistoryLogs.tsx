import HistoryContainer from "../components/HistoryContainer/HistoryContainer";
import Sidebar from "../components/Sidebar";
import Colors from "../theme/Colors";

const HistoryLogs = () => {
  return (
    <div style={styles.mainContainer}>
      <Sidebar />
      <div style={styles.container}>
        <HistoryContainer />
      </div>
    </div>
  );
};

export default HistoryLogs;

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    width: "100%",
    height: "100vh",
    backgroundColor: Colors.white00,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 24,
  },
};
