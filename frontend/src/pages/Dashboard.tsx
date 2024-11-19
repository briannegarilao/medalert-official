import Sidebar from "../components/Sidebar";
import AddMedicineBtn from "../components/Add_Medicine_Btn";
import MissedDoses from "../components/MissedDoses";
import Stock from "../components/CurrentStock";
import "../App.css";
import Profile from "../components/Profile";
import UpMedSched from "../components/UpMedSched";
import TodaySched from "../components/TodaySched";
import Carousel from "../components/Carousel";

function Dashboard() {
  return (
    <>
      <div className="d-flex">
        
        <div>
            <Sidebar />
        </div>


        <div className="container" style={{ flex: 1, marginTop: 20 }}>
          <div className="row">
            {/* First Two Columns Section */}
            <div className="col-md-8">
              <div className="row mb-3">
                {/* First Column */}
                <div className="col-md-6">
                  <AddMedicineBtn />
                  <TodaySched />
                </div>

                {/* Second Column */}
                <div className="col-md-6">
                  <UpMedSched />
                </div>
              </div>

              {/* Second Row for the First Two Columns */}
              <div className="row">

                      <Carousel />

              </div>
            </div>

            {/* Third Column */}
            <div className="col-md-4">
              <div className="row mb-3">
                <Profile />
              </div>
              <div className="row mb-3">
                <Stock />
              </div>
              <div className="row mb-3">
                <MissedDoses />
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default Dashboard;
