import "../App.css";
import Sidebar from "../components/Sidebar";
import AddMedicineBtn from "../components/DashboardContainer/NewMedicine/AddMedicineBtn";
import MissedDoses from "../components/DashboardContainer/MissedDosesContainer/MissedDoses";
import Stock from "../components/DashboardContainer/CurrentStockContainer/Stock";
import Profile from "../components/DashboardContainer/ProfileContainer/Profile";
import UpMedSched from "../components/DashboardContainer/UpcomingMedicationContainer/UpMedSched";
import TodaySched from "../components/DashboardContainer/TodaySchedContainer/TodaySched";
import Colors from "../theme/Colors";
import Notifications from "../components/Notification/Notifications";

function Dashboard() {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.notificationCard}>
        <Notifications />
      </div>

      <div>
        <Sidebar />
      </div>

      <div style={styles.dashboardContainer}>
        <div style={styles.addMedAndTodaySched}>
          <AddMedicineBtn />
          <TodaySched />
        </div>

        <div style={styles.upMedSched}>
          <UpMedSched />
        </div>
        <div style={styles.profileAndOthers}>
          <Profile />
          <MissedDoses />
          <Stock />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

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
  dashboardContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    padding: 24,
  },
  addMedAndTodaySched: {
    width: "33.33%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  upMedSched: {
    width: "33.33%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileAndOthers: {
    width: "33.33%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
  },
  notificationCard: {
    position: "absolute",
    top: 24,
    right: 24,
  },
};
