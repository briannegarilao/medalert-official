import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; // Import your Firebase config
import Colors from "../../../theme/Colors";

function Profile() {
  const [firstName, setFirstName] = useState<string>("");

  // Fetch user data
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser = "userId_0001"; // Replace with dynamic userId if needed
        const userDocRef = doc(db, "Users", currentUser);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || "User"); // Default to "User" if field is missing
        } else {
          console.error("User document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div style={styles.card}>
      {/* LEFT SIDE: PROFILE IMAGE + DESCRIPTION */}
      <div style={styles.profileContainer}>
        {/* CLICKABLE PROFILE IMAGE */}
        <Link to="/Profile">
          <div style={styles.profileImage}></div>
        </Link>

        {/* PROFILE DESC */}
        <div style={styles.profileDesc}>
          {/* PROFILE HEADING */}
          <h2 style={{ fontSize: 24 }}>Profile</h2>
          {/* Centered Greeting */}
          <Link to="/Profile" style={{ textDecoration: "none" }}>
            <h2 style={{ fontSize: 32 }}>Hi {firstName}</h2>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: NOTIFICATION ICON */}
      <div style={styles.bellIcon}>
        <i className="bi bi-bell-fill" style={{ fontSize: "24px" }}></i>
      </div>
    </div>
  );
}

export default Profile;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    padding: "1rem",
    borderRadius: 8,
    border: `1px solid ${Colors.gray00}`,
    boxShadow: `0 4px 8px ${Colors.gray00}`,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    fontSize: 24,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  },
  profileDesc: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    backgroundColor: "lightblue",
    borderRadius: "50%",
    border: "2px solid gray",
    textAlign: "center",
  },
};
