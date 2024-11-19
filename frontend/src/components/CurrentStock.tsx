function Stock() {
    const mockData = [
        { name: "Medicine A", remainingStock: 10, hasStock: true },
        { name: "Medicine B", remainingStock: 0, hasStock: false },
        { name: "Medicine C", remainingStock: 5, hasStock: true },
        { name: "Medicine D", remainingStock: 0, hasStock: false },
      ];

  return (
    <div
      className="card shadow"
      style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
    >
      <div className="card-body">
        <h2
          className="card-title"
          style={{ textAlign: "left", fontSize: 20 }}
        >
          Current Stock
        </h2>
        <div
          style={{
            maxHeight: "120px", // Set max height for scrolling
            overflowY: "auto", // Enable vertical scrolling
            overflowX: "hidden", // Prevent horizontal scrolling
            paddingRight: "0.5rem", // Prevent content clipping by scrollbar
          }}
        >
          {mockData.map((data, index) => (
            <div className="row mb-3" key={index}>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: data.hasStock ? "green" : "red", // Conditional color
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div className="col-md-10">
                <label
                  htmlFor={`medicine-${index}`}
                  className="form-label"
                  style={{ margin: "0" }}
                >
                  {data.name}
                </label>
                <p style={{ margin: "0", color: "gray" }}>
                  Remaining Stock: {data.remainingStock}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{marginTop: 10}}>
          <button type="button" className="btn btn-light">
            Check all status
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stock;
