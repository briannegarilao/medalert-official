function MissedDoses() {
    const mockData = [
        { name: "Medication A", timeMissed: "10:00 AM, Nov 15" },
        { name: "Medication B", timeMissed: "02:00 PM, Nov 14" },
        { name: "Medication C", timeMissed: "09:00 AM, Nov 13" },
        { name: "Medication D", timeMissed: "11:00 AM, Nov 12" },
      ];

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
                Missed Doses
                </h2>
                <div
                style={{
                    maxHeight: "120px", // Set a max height for the scrollable container
                    overflowY: "auto", // Add scroll when content exceeds maxHeight
                    overflowX: "hidden",
                    paddingRight: "0.5rem"
                }}
                >
                {mockData.map((data, index) => (
                    <div className="row mb-3" key={index}>
                    <div className="col-md-2 d-flex align-items-center justify-content-center">
                        <i className="bi bi-exclamation-diamond"></i>
                    </div>
                    <div className="col-md-10">
                        <label
                        htmlFor={`medication-${index}`}
                        className="form-label"
                        style={{ margin: "0" }}
                        >
                        {data.name}
                        </label>
                        <p style={{ margin: "0", color: "red" }}>{data.timeMissed}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default MissedDoses;
