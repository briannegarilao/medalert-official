import { useState } from "react";

function Carousel() {
    
    const mockData = [
        {
          progress: 4,
          total: 16,
          medicineName: "Biogesic",
          type: "Paracetamol",
          dosage: "500mg",
          timesADay: 3,
          days: 5,
          color: "#279DDA",
        },
        {
          progress: 7,
          total: 16,
          medicineName: "Amoxicillin",
          type: "Antibiotics",
          dosage: "200mg",
          timesADay: 2,
          days: 7,
          color: "green",
        },
        {
          progress: 10,
          total: 16,
          medicineName: "Vitamin C",
          type: "Vitamin",
          dosage: "100mg",
          timesADay: 1,
          days: 10,
          color: "orange",
        },
      ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <>
        <div
        id="medicineCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ maxWidth: "100%", padding: "1rem" }}
        >
        <div className="carousel-inner">
            {mockData.map((data, idx) => (
            <div
                key={idx}
                className={`carousel-item ${index === idx ? "active" : ""}`}
            >
                <div
                className="card shadow"
                style={{
                    width: "100%",
                    height: "247px",
                    padding: "1rem",
                    backgroundColor: data.color,
                }}
                >
                <h2
                    className="card-title"
                    style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                    marginBottom: 20,
                    }}
                >
                    Progress Bar - {data.progress}/{data.total}
                </h2>

                <div
                    className="progress"
                    role="progressbar"
                    aria-label="Info example"
                    aria-valuenow={data.progress}
                    aria-valuemin={0}
                    aria-valuemax={data.total}
                >
                    <div
                    className="progress-bar bg-info text-white"
                    style={{ width: `${(data.progress / data.total) * 100}%` }}
                    >
                    {Math.round((data.progress / data.total) * 100)}%
                    </div>
                </div>

                <div
                    className="row d-flex align-items-center justify-content-center"
                    style={{ marginTop: "20px" }}
                >
                    <div className="col-md-4 text-center">
                    <label
                        htmlFor="MedicineName"
                        className="form-label text-white"
                        style={{ fontSize: "50px", fontWeight: "bold" }}
                    >
                        {data.medicineName}
                    </label>
                    <div className="row">
                        <div className="col text-end">
                        <p className="text-white">{data.type}</p>
                        </div>
                        <div className="col text-start">
                        <p className="text-white">{data.dosage}</p>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-2 d-flex justify-content-center">
                    <div
                        className="rounded-circle bg-white"
                        style={{ width: "100px", height: "100px" }}
                    ></div>
                    </div>

                    <div className="col-md-4">
                    <div
                        className="card text-bg-dark mx-auto"
                        style={{ maxWidth: "15rem" }}
                    >
                        <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 text-center border-end">
                            <h3 className="card-title text-white" style={{ fontSize: "30px" }}>
                                {data.timesADay}x
                            </h3>
                            <p className="text-white">times a day</p>
                            </div>

                            <div className="col-md-6 text-center">
                            <h3 className="card-title text-white" style={{ fontSize: "30px" }}>
                                {data.days}
                            </h3>
                            <p className="text-white">days</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>

        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#medicineCarousel"
            data-bs-slide="prev"
            onClick={() => handleSelect(index === 0 ? mockData.length - 1 : index - 1)}
        >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#medicineCarousel"
            data-bs-slide="next"
            onClick={() => handleSelect(index === mockData.length - 1 ? 0 : index + 1)}
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
        </>
    );
}

export default Carousel;