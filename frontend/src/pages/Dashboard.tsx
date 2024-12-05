import "../../App/App.css";
import AddMedicineBtn from "../components/DashboardContainer/NewMedicineContainer/AddMedicineBtn";
import MissedDoses from "../components/DashboardContainer/Modules/MissedMedContainer/MissedMedsModule";
import Stock from "../components/DashboardContainer/Modules/CurrentStockContainer/StockModule";
import Profile from "../components/DashboardContainer/Modules/ProfileContainer/ProfileModule";
import UpMedSched from "../components/DashboardContainer/Modules/UpcomingMedicationContainer/UpMedsModule";
import TodaySched from "../components/DashboardContainer/Modules/TodaySchedContainer/TodaySchedModule";
import Colors from "../theme/Colors";
import Notifications from "../components/NotificationContainer/Notifications";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.notifications}>
        <Notifications />
      </div>

      <Sidebar />

      <div style={styles.dashboardContainer}>
        <div style={styles.column}>
          <AddMedicineBtn />
          <TodaySched />
        </div>

        <div style={styles.column}>
          <UpMedSched />
        </div>
        
        <div style={styles.column}>
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
  column: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    width: "33.33%",
  },
  notifications: {
    position: "absolute",
    top: 24,
    right: 24,
  },
};
