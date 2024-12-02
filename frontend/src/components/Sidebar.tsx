import { useNavigate, Link } from "react-router-dom";
import Colors from "../theme/Colors";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/Login");
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.titleRow}>
        <h1 style={styles.mainTitle}>
          <span>Med</span>
          <span style={{ color: "red" }}>Alert</span>
        </h1>
      </div>

      <div style={styles.menuRow}>
        <h2 style={styles.menuTitle}>MENU</h2>
      </div>

      <div style={styles.menuItems}>
        <div style={styles.navContainer}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <div style={styles.iconContainer}>
                <i className="bi bi-house-door-fill"></i>
              </div>
              <div style={styles.linkContainer}>
                <Link style={styles.navLink} to="/Dashboard">
                  Dashboard
                </Link>
              </div>
            </li>

            <li style={styles.navItem}>
              <div style={styles.iconContainer}>
                <i className="bi bi-gear-fill"></i>
              </div>
              <div style={styles.linkContainer}>
                <Link style={styles.navLink} to="/Settings">
                  Settings
                </Link>
              </div>
            </li>

            <li style={styles.navItem}>
              <div style={styles.iconContainer}>
                <i className="bi bi-clock-history"></i>
              </div>
              <div style={styles.linkContainer}>
                <Link style={styles.navLink} to="/HistoryLogs">
                  History
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <hr style={styles.separator} />

      <div style={styles.footer}>
        <div style={styles.footerItem}>
          <div style={styles.iconContainer}>
            <i className="bi bi-question-circle-fill"></i>
          </div>
          <div style={styles.linkContainer}>
            <a href="#" style={styles.helpLink}>
              Help
            </a>
          </div>
        </div>

        <div style={styles.footerItem}>
          <div style={styles.iconContainer}>
            <i className="bi bi-box-arrow-right"></i>
          </div>
          <div style={styles.linkContainer}>
            <button style={styles.logoutButton} onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    height: "100vh",
    boxShadow: `4px 4px 8px ${Colors.gray00}`,
    backgroundColor: "#CBDCEB",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    color: Colors.blue01,
  },
  cardBody: {
    width: "100%",
  },
  titleRow: {
    marginBottom: "16px",
  },
  mainTitle: {
    textAlign: "center",
    fontSize: "48px",
    marginTop: "50px",
  },
  menuRow: {
    marginBottom: "16px",
  },
  menuTitle: {
    textAlign: "left",
    fontSize: "20px",
    marginTop: "20px",
  },
  menuItems: {
    marginBottom: "16px",
  },
  navContainer: {
    width: "200px",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  iconContainer: {
    flex: "0 0 30px",
  },
  linkContainer: {
    flex: 1,
  },
  navLink: {
    textDecoration: "none",
    color: "#000",
  },
  separator: {
    border: "1px solid #000",
    margin: "20px 0",
  },
  footer: {
    position: "absolute",
    bottom: "20px",
    left: "0",
    marginLeft: "30px",
    width: "200px",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  helpLink: {
    color: "#6c757d",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "1px solid #dc3545",
    color: "#dc3545",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
