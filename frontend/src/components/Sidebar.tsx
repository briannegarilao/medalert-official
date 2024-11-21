import { useNavigate, Link } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/Login");
  };

  return (
    <div
      className="d-flex flex-column sidebar-text p-3 vh-100 shadow-lg"
      style={{
        width: "250px",
        backgroundColor: "#CBDCEB",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        position: "relative",
      }}
    >
      <div className="card-body">
        <div className="row mb-3">
          <h1
            className="card-title"
            style={{ textAlign: "center", fontSize: 40, marginTop: 50 }}
          >
            <span>Med</span>
            <span style={{ color: "red" }}>Alert</span>
          </h1>
        </div>

        <div className="row mb-3">
          <h2
            className="card-title"
            style={{ textAlign: "left", fontSize: 20, marginTop: 20 }}
          >
            MENU
          </h2>
        </div>

        <div className="row">
          <div className="container" style={{ width: 200 }}>
            <ul className="nav nav-underline flex-column p-0">
              <li className="nav-item d-flex align-items-center mb-2">
                <div className="col-md-2">
                  <i className="bi bi-house-door-fill"></i>
                </div>
                <div className="col-md-10">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/Dashboard"
                  >
                    Dashboard
                  </Link>
                </div>
              </li>

              <li className="nav-item d-flex align-items-center mb-2">
                <div className="col-md-2">
                  <i className="bi bi-gear-fill"></i>
                </div>
                <div className="col-md-10">
                  <Link className="nav-link" to="/Settings">
                    Settings
                  </Link>
                </div>
              </li>

              <li className="nav-item d-flex align-items-center mb-2">
                <div className="col-md-2">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div className="col-md-10">
                  <Link className="nav-link" to="/HistoryLogs">
                    History
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ border: "1px solid #000", margin: "20px 0" }} />

        <div
          className="container"
          style={{
            width: 200,
            position: "absolute",
            bottom: "20px",
            left: "0",
            marginLeft: 30,
          }}
        >
          <div className="row d-flex align-items-center mb-3">
            <div className="col-md-2">
              <i className="bi bi-question-circle-fill"></i>
            </div>
            <div className="col-md-10">
              <a
                href="#"
                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Help
              </a>
            </div>
          </div>

          <div className="row d-flex align-items-center mb-3">
            <div className="col-md-2">
              <i className="bi bi-box-arrow-right"></i>
            </div>
            <div className="col-md-10">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
