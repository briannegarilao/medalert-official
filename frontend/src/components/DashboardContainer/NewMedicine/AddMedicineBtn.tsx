import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import MedInfo from "./MedInfo";
import SetTime from "./SetTime";
import SetDate from "./SetDate";
import colors from "../../../theme/Colors";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

interface MedicineData {
  medicineName: string;
  dosageValue: string;
  dosageUnit: string;
  isAntibiotic: string;
  specialInstruction: string;
  selectedColor: string;
  stock: number;
  timeFrequency: string;
  dateFrequency: string;
  timesPerDay: string[];
  startDate: Date | null;
  endDate: Date | null;
  customTimeFrequency: string;
  customDateFrequency: string;
  datesToTake: Date[]; // Array of dates for medication schedule
}

function AddMedicineBtn() {
  const [currentStep, setCurrentStep] = useState(0);
  const stepTitles = ["Medicine Information", "Set Time", "Set Date"];

  const [medicineData, setMedicineData] = useState<MedicineData>({
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
    datesToTake: [], // Initialize with empty array
  });

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
    datesToTake: [],
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const closeModal = () => {
    setMedicineData(initialMedicineData);
    setCurrentStep(0);
  };

  const setSchedule = async () => {
    const userId = "userId_0001";
    const medicationsRef = collection(db, `Users/${userId}/Medications`);

    // Generate notifications based on datesToTake and timesPerDay
    const notifications = medicineData.datesToTake.flatMap((date) =>
      medicineData.timesPerDay.map((time) => ({
        date: date.toISOString().split("T")[0], // Format the date
        time: time,
        isTaken: false,
        isLate: false,
        lateCount: 0,
        isMissed: false,
      }))
    );

    const medicationDataToSave = {
      medicineName: medicineData.medicineName,
      dosageValue: medicineData.dosageValue,
      dosageUnit: medicineData.dosageUnit,
      isAntibiotic: medicineData.isAntibiotic,
      specialInstruction: medicineData.specialInstruction,
      selectedColor: medicineData.selectedColor,
      totalStock: medicineData.stock,
      currentStock: medicineData.stock,
      startDate: medicineData.startDate
        ? medicineData.startDate.toISOString().split("T")[0] // Format the date
        : null,
      endDate: medicineData.endDate
        ? medicineData.endDate.toISOString().split("T")[0] // Format the date
        : null,
      datesToTake: medicineData.datesToTake.map(
        (date) => date.toISOString().split("T")[0]
      ), // Format each date
      timesPerDay: medicineData.timesPerDay, // Already in ISO Time Format
      notifications,
    };

    try {
      const docRef = await addDoc(medicationsRef, medicationDataToSave);
      console.log("Medication added with ID:", docRef.id);
      setCurrentStep(0);
      setMedicineData(initialMedicineData);
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  useEffect(() => {
    console.log("Medicine data updated:", medicineData);
  }, [medicineData]);

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
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setCurrentStep(1);
          setMedicineData(initialMedicineData);
        }}
        style={styles.primaryButton}
      >
        ADD MEDICINE
      </button>

      {currentStep > 0 && (
        <Modal
          title={stepTitles[currentStep - 1]}
          onClose={closeModal}
          clearData={closeModal}
        >
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
                onClick={setSchedule}
                style={{ ...styles.navButton, marginLeft: "auto" }}
              >
                Set Schedule
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default AddMedicineBtn;

const styles: { [key: string]: React.CSSProperties } = {
  primaryButton: {
    width: "100%",
    padding: "10px 24px",
    backgroundColor: colors.blue01,
    color: colors.white00,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
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
