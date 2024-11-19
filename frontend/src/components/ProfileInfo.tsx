function ProfileInfo() {
  return (
    <div className="card shadow-sm">
      <div className="card" style={{ backgroundColor: "#CBDCEB" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex justify-content-center align-items-center">
                <div className="row mb-3 justify-content-center">
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "lightblue",
                      borderRadius: "50%",
                      border: "2px solid gray",
                      textAlign: "center",
                    }}
                  ></div>
                  <button type="button" className="btn">
                    Change Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <h2
                className="card-title"
                style={{ textAlign: "left", fontSize: 20 }}
              >
                Basic Information
              </h2>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="legalName"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Legal Name
                      </label>
                      <p style={{ marginBottom: 0 }}>Lisa Simpson</p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="emailAddress"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Email Address
                      </label>
                      <p style={{ marginBottom: 0 }}>SimpsonL@sample.com</p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="phoneNum"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Phone Number
                      </label>
                      <p style={{ marginBottom: 0 }}>+63 9xx xxx xxxx</p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2
                className="card-title"
                style={{ textAlign: "left", fontSize: 20 }}
              >
                Guardian Access
              </h2>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="emailAddressGuardian"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Email Address
                      </label>
                      <p style={{ marginBottom: 0 }}>medSimpson@sample.com</p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="phoneNumGuardian"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Phone Number
                      </label>
                      <p style={{ marginBottom: 0 }}>+63 9xx xxx xxxx</p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2
                className="card-title"
                style={{ textAlign: "left", fontSize: 20 }}
              >
                Account Security
              </h2>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="password"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Password
                      </label>
                      <p style={{ marginBottom: 0 }}>***********</p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card"
                style={{ marginBottom: 10, backgroundColor: "#A9C6DD" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <label
                        htmlFor="phoneNumGuardian"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Deletion
                      </label>
                      <p style={{ marginBottom: 0 }}>
                        Permanently delete your account.
                      </p>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-light">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "20%" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
