function TodaySched() {
  const mockMealData = [
    {
      meal: "Breakfast",
      time: "08:15-12:00",
      medications: [
        {
          medicationName: "Aspirin",
          dose: "1 tablet",
          instruction: "Take with food",
          backgroundColor: "#6A5EEE", // Background color for the card
        },
        {
          medicationName: "Vitamin C",
          dose: "2 tablets",
          instruction: "Take after meal",
          backgroundColor: "#279DDA", // Background color for the card
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00-14:00",
      medications: [
        {
          medicationName: "Ibuprofen",
          dose: "1 tablet",
          instruction: "Take with water",
          backgroundColor: "#019966", // Background color for the card
        },
      ],
    },
    {
      meal: "Dinner",
      time: "18:00-20:00",
      medications: [
        {
          medicationName: "Paracetamol",
          dose: "1 tablet",
          instruction: "Take every 4 hours",
          backgroundColor: "#F1B401", // Background color for the card
        },
      ],
    },
  ];

  return (
    <div
      className="card shadow"
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "494px", // Fixed typo: '750x' -> '750px'
        padding: "1rem",
      }}
    >
      <h2 className="card-title" style={{ textAlign: "center", fontSize: 20 }}>
        Today's Schedule
      </h2>

      <div
        className="container"
        style={{
          marginTop: 20,
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "0.5rem",
        }}
      >
        {mockMealData.map((meal, mealIndex) => (
          <div
            key={mealIndex}
            className="card shadow-sm"
            style={{ marginBottom: 10 }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <label>
                  <h3 style={{ fontSize: 16 }}>{meal.meal}</h3>
                </label>
                <p
                  style={{
                    margin: "0",
                    fontSize: 15,
                    textAlign: "right",
                    color: "red",
                  }}
                >
                  {meal.time}
                </p>
              </div>

              {/* Render the medications for the current meal */}
              {meal.medications.map((med, medIndex) => (
                <div key={medIndex} className="card" style={{ marginTop: 10 }}>
                  <div
                    className="card-body"
                    style={{
                      position: "relative",
                      backgroundColor: med.backgroundColor,
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <label>
                        <h3 style={{ fontSize: 16, color: "white" }}>
                          {med.medicationName}
                        </h3>
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault-${mealIndex}-${medIndex}`}
                      />
                    </div>
                    <p style={{ margin: "0", fontSize: 14, color: "white" }}>
                      Dose: {med.dose}
                    </p>
                    <p style={{ margin: "0", fontSize: 14, color: "white" }}>
                      Instruction: {med.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaySched;
