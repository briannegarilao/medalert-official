import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import MedInfo from "./MedInfo";
import SetTime from "./SetTime";
import SetDate from "./SetDate";
import colors from "../../../theme/Colors";

// TODO: Make a function to handle the addition of medicine and add its data to firebase
// TODO: Double check the MedInfo, SetTime, and SetDate components to ensure they are working correctly
// TODO: Add a confirmation message when the medicine is successfully added (console.log for now)
// TODO: Add error handling for invalid inputs or missing data in the medicine addition process
// TODO: Make sure the codes for the steps are consistent. Understand the flow of the steps and make sure they are working correctly.

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
  timeFrequency: string; // How many times the medicine should be taken per day
  dateFrequency: string; // Frequency of the overall medication schedule
  timesPerDay: string[]; // Array to store specific times for medication
  startDate: Date | null; // Start date of the medication schedule
  endDate: Date | null; // End date of the medication schedule
  customTimeFrequency: string; // Custom frequency for timing (if not standard)
  customDateFrequency: string; // Custom frequency for overall schedule
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
    timeFrequency: "1", // Default to once per day
    dateFrequency: "1", // Default to daily schedule
    timesPerDay: [], // Empty array to be populated with specific times
    startDate: null, // No start date initially
    endDate: null, // No end date initially
    customTimeFrequency: "", // For non-standard timing
    customDateFrequency: "", // For non-standard schedule
  });

  // CLEAR MEDICINE DATA
  const initialMedicineData: MedicineData = {
    medicineName: "",
    dosageValue: "",
    dosageUnit: "mg",
    isAntibiotic: "",
    specialInstruction: "",
    selectedColor: "",
    stock: 1,
    timeFrequency: "1",
    dateFrequency: "1",
    timesPerDay: [],
    startDate: null,
    endDate: null,
    customTimeFrequency: "",
    customDateFrequency: "",
  };

  // ==================================================================
  // NEXT AND BACK BUTTON HANDLERS
  // Increments the currentStep state
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Decrements the currentStep state
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  // ==================================================================

  // Move useEffect to component level
  useEffect(() => {
    console.log("Medicine data updated:", medicineData);
  }, [medicineData]);

  // CLOSE MODAL FUNCTION
  const closeModal = () => {
    setMedicineData(initialMedicineData);
    setCurrentStep(0);
  };

  // ==================================================================

  // SET SCHEDULE FUNCTION
  const setSchedule = () => {
    setCurrentStep(0);
  };

  // ==================================================================
  // RENDER STEP CONTENT FUNCTION
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
      <button
        onClick={() => {
          setCurrentStep(1);
          setMedicineData(initialMedicineData);
        }}
        style={styles.primaryButton}
      >
        Add Medicine
      </button>

      {/* Modal is only rendered when a step is active (currentStep > 0) */}
      {currentStep > 0 && (
        <Modal
          title={stepTitles[currentStep - 1]}
          onClose={closeModal}
          clearData={closeModal}
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
