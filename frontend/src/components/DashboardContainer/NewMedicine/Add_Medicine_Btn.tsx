import React, { useState } from "react";
import Modal from "./Modal";
import MedInfo from "./Step1MedInfo";
import SetTime from "./Step2MedInfo";
import SetDate from "./Step3MedInfo";
import colors from "../../../theme/Colors";

function AddMedicineBtn() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = no modal, 1 = MedInfo, 2 = SetTime, 3 = SetDate

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const closeModal = () => setCurrentStep(0);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <MedInfo />;
      case 2:
        return <SetTime />;
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
            {currentStep > 1 && (
              <button onClick={handleBack} style={styles.navButton}>
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button onClick={handleNext} style={styles.navButton}>
                Next
              </button>
            ) : (
              <button onClick={closeModal} style={styles.navButton}>
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: "20px",
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
