import ProfileInfo from "../components/ProfileInfo";
import Sidebar from "../components/Sidebar";

function ProfilePage() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container" style={{ flex: 1, marginTop: 20 }}>
        <ProfileInfo />
      </div>
    </div>
  );
}

export default ProfilePage;
