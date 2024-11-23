interface CardProps {
  data: {
    progress: number;
    total: number;
    medicineName: string;
    type: string;
    dosage: string;
    timesADay: number;
    days: number;
    color: string;
  };
}

function Card({ data }: CardProps) {
  const progressPercentage = Math.round((data.progress / data.total) * 100);

  return (
    <div
      className="card shadow"
      style={{
        width: "100%",
        height: "247px",
        padding: "1rem",
        backgroundColor: data.color || "#279DDA",
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
        aria-valuenow={data.progress}
        aria-valuemin={0}
        aria-valuemax={data.total}
      >
        <div
          className="progress-bar bg-info text-white"
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage}%
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
                  <h3
                    className="card-title text-white"
                    style={{ fontSize: "30px" }}
                  >
                    {data.timesADay}x
                  </h3>
                  <p className="text-white">times a day</p>
                </div>
                <div className="col-md-6 text-center">
                  <h3
                    className="card-title text-white"
                    style={{ fontSize: "30px" }}
                  >
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
  );
}

export default Card;
