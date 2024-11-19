import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <div
        className="card shadow"
        style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
      >
        <div className="card-body">
          <h2
            className="card-title"
            style={{ textAlign: "left", fontSize: 20 }}
          >
            Profile
          </h2>

          <div className="d-flex justify-content-center align-items-center">
            <div>
              {/* Clickable Circle */}
              <div className="row mb-3 justify-content-center">
                <Link to="/Profile" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "lightblue",
                      borderRadius: "50%",
                      border: "2px solid gray",
                      textAlign: "center",
                    }}
                  ></div>
                </Link>
              </div>

              {/* Centered Greeting */}
              <div className="row mb-3 justify-content-center">
                <Link to="/Profile" style={{ textDecoration: "none" }}>
                  <h2
                    className="card-title"
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Hi User00
                  </h2>
                </Link>
              </div>
            </div>
          </div>

          {/* Centered Notification Icon */}
          <div className="row mb-3 justify-content-center">
            <div className="col-md-5" style={{ textAlign: "center" }}>
              <i className="bi bi-bell-fill" style={{ fontSize: "24px" }}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
