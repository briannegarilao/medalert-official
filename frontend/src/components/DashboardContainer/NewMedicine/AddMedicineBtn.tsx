import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import MedInfo from "./MedInfo";
import SetTime from "./SetTime";
import SetDate from "./SetDate";
import colors from "../../../theme/Colors";

// TypeScript interface to define the structure and type of medicine data
// This provides type safety and clear documentation of the expected medicine information
interface MedicineData {
  medicineName: string; // Stores the name of the medicine
  dosageValue: string; // Numeric value of the dosage (e.g., "500")
  dosageUnit: string; // Unit of dosage measurement (e.g., "mg", "ml")
  isAntibiotic: string; // Indicates whether the medicine is an antibiotic
  specialInstruction: string; // Any special notes or instructions for the medicine
  selectedColor: string; // Color associated with the medicine (for visual differentiation)
  stock: number; // Number of medicine units currently available
  timingFrequency: string; // How many times the medicine should be taken per day
  scheduleFrequency: string; // Frequency of the overall medication schedule
  timesPerDay: string[]; // Array to store specific times for medication
  startDate: Date | null; // Start date of the medication schedule
  endDate: Date | null; // End date of the medication schedule
  customTimingFrequency: string; // Custom frequency for timing (if not standard)
  customScheduleFrequency: string; // Custom frequency for overall schedule
}

function AddMedicineBtn() {
  // CONSTANTS
  // State to manage the current step in the medicine addition workflow
  const [currentStep, setCurrentStep] = useState(0);
  // Titles for each step to be displayed in the modal header
  const stepTitles = ["Medicine Information", "Set Time", "Set Date"];

  // ==================================================================
  // MEDICINE DATA STATE
  const [medicineData, setMedicineData] = useState<MedicineData>({
    medicineName: "", // Empty initially, to be filled by user
    dosageValue: "", // Empty initially, to be filled by user
    dosageUnit: "mg", // Default dosage unit set to milligrams
    isAntibiotic: "", // Empty initially, to be selected by user
    specialInstruction: "", // Optional field for additional instructions
    selectedColor: "", // Color to be chosen by user
    stock: 1, // Default stock set to 1 unit
    timingFrequency: "1", // Default to once per day
    scheduleFrequency: "1", // Default to daily schedule
    timesPerDay: [], // Empty array to be populated with specific times
    startDate: null, // No start date initially
    endDate: null, // No end date initially
    customTimingFrequency: "", // For non-standard timing
    customScheduleFrequency: "", // For non-standard schedule
  });

  // CLEAR THE MEDICINE DATA
  const clearMedicineData = useCallback(() => {
    setMedicineData({
      medicineName: "",
      dosageValue: "",
      dosageUnit: "mg",
      isAntibiotic: "",
      specialInstruction: "",
      selectedColor: "",
      stock: 1,
      timingFrequency: "1",
      scheduleFrequency: "1",
      timesPerDay: [],
      startDate: null,
      endDate: null,
      customTimingFrequency: "",
      customScheduleFrequency: "",
    });
  }, []);

  // ==================================================================
  // NEXT AND BACK BUTTON HANDLERS
  // Increments the currentStep state
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Decrements the currentStep state
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  // ==================================================================

  // CLOSE MODAL FUNCTION
  // Closes the modal and resets the current step
  // Performs final data validation and logging when closing from the final step
  const closeModal = () => {
    console.log("Closed modal and cleared data: ", medicineData);
    setCurrentStep(0);
  };

  // ==================================================================
  const setSchedule = () => {
    setCurrentStep(0); // Close modal
  };

  // ==================================================================
  // RENDER STEP CONTENT FUNCTION
  // Dynamically renders the appropriate component based on the current step
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
            setMedicineData={setMedicineData}
          />
        );
      case 3:
        return (
          <SetDate
            medicineData={medicineData}
            setMedicineData={setMedicineData}
          />
        );
      default:
        // If no step matches, return null
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Button to initiate the medicine addition process */}
      {/* Clicking this button sets the current step to 1, opening the modal */}
      <button onClick={() => setCurrentStep(1)} style={styles.primaryButton}>
        Add Medicine
      </button>

      {/* Modal is only rendered when a step is active (currentStep > 0) */}
      {currentStep > 0 && (
        <Modal
          title={stepTitles[currentStep - 1]}
          onClose={closeModal}
          clearData={clearMedicineData}
        >
          {/* Dynamically render the content for the current step */}
          {renderStepContent()}

          {/* Navigation buttons container */}
          <div style={styles.navigationButtons}>
            {/* Back button - shown from step 2 onwards */}
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                style={{ ...styles.navButton, marginRight: "auto" }}
              >
                Back
              </button>
            ) : (
              <div style={{ flex: 1 }} /> // Placeholder to maintain layout
            )}

            {/* Next/Set Schedule button */}
            {/* Changes based on the current step */}
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                style={{ ...styles.navButton, marginLeft: "auto" }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={setSchedule}
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
