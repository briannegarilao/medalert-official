function ProfileInfo() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <p>profile pic</p>
          </div>
          <div className="col-md-9">
            <h2
              className="card-title"
              style={{ textAlign: "left", fontSize: 20 }}
            >
              Basic Information
            </h2>
            <div className="card">
              <div className="card-body">
                <label
                  htmlFor="legalName"
                  className="form-label"
                  style={{ marginBottom: 10 }}
                >
                  Legal Name
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
