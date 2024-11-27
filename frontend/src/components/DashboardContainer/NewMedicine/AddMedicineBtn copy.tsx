import React, { useState } from "react";
import Modal from "./Modal";
import MedInfo from "./MedInfo";
import SetTime from "./SetTime";
import SetDate from "./SetDate";
import colors from "../../../theme/Colors";

interface MedicineData {
  medicineName: string;
  dosageValue: string;
  dosageUnit: string;
  isAntibiotic: string;
  specialInstruction: string;
  selectedColor: string;
  stock: number;
  frequency: string; // Update the type to string to match SetDate
  timesPerDay: string[]; // Add timesPerDay to match AddMedicineBtn
  startDate: Date | null;
  endDate: Date | null;
  customFrequency: string;
}

function AddMedicineBtn() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = no modal, 1 = MedInfo, 2 = SetTime, 3 = SetDate
  const [medicineData, setMedicineData] = useState<MedicineData>({
    medicineName: "",
    dosageValue: "",
    dosageUnit: "mg",
    isAntibiotic: "",
    specialInstruction: "",
    selectedColor: "",
    stock: 1,
    frequency: "1", // Update frequency to string to match SetDate
    timesPerDay: [],
    startDate: null,
    endDate: null,
    customFrequency: "",
  });

  const handleNext = () => {
    if (currentStep === 1) {
      // Save data when moving from MedInfo to SetTime
      setMedicineData({
        ...medicineData,
        // Retain all previous data and add the frequency/times
      });
    } else if (currentStep === 2) {
      // Save data when moving from SetTime to SetDate
      setMedicineData({
        ...medicineData,
        frequency: medicineData.frequency, // Ensure frequency is saved
        timesPerDay: medicineData.timesPerDay, // Ensure timesPerDay are saved
      });
    }

    setCurrentStep((prev) => prev + 1);
    console.log("Medicine Data:", medicineData);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const closeModal = () => setCurrentStep(0);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <MedInfo
            medicineData={medicineData}
            setMedicineData={setMedicineData}
          />
        );
      case 2:
        return (
          <SetTime
            medicineData={medicineData}
            setMedicineData={setMedicineData} // Pass down setter to update data in AddMedicineBtn
          />
        );
      case 3:
        return <SetDate />;
      default:
        return null;
    }
  };

  const stepTitles = ["Medicine Information", "Set Time", "Set Date"];

  return (
    <div style={styles.container}>
      <button onClick={() => setCurrentStep(1)} style={styles.primaryButton}>
        Add Medicine
      </button>

      {currentStep > 0 && (
        <Modal title={stepTitles[currentStep - 1]} onClose={closeModal}>
          {renderStepContent()}
          <div style={styles.navigationButtons}>
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                style={{ ...styles.navButton, marginRight: "auto" }}
              >
                Back
              </button>
            ) : (
              <div style={{ flex: 1 }} />
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                style={{ ...styles.navButton, marginLeft: "auto" }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={closeModal}
                style={{ ...styles.navButton, marginLeft: "auto" }}
              >
                Set Schedule
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AddMedicineBtn;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2px",
    textAlign: "center",
  },
  primaryButton: {
    padding: "10px 24px",
    backgroundColor: colors.blue01,
    color: colors.white00,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  navigationButtons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navButton: {
    padding: "8px 16px",
    backgroundColor: colors.blue01,
    color: colors.white00,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
