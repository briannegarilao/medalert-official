import { useState } from "react";
import MedInfo from "./Step1MedInfo";
import SetTime from "./Step2MedInfo";
import SetDate from "./Step3MedInfo";

function AddMedicineBtn() {

    const [isStep1Visible, setIsStep1Visible] = useState(false);

    const [isStep2Visible, setIsStep2Visible] = useState(false);

    const [isStep3Visible, setIsStep3Visible] = useState(false);

    const toggleStep1Visibility = () => {
        setIsStep1Visible(!isStep1Visible);
    };

    const toggleStep2Visibility = () => {
        setIsStep2Visible(!isStep2Visible);
    };

    const toggleStep3Visibility = () => {
        setIsStep3Visible(!isStep3Visible);
    };

    return (
        <div
            className="card shadow mb-3"
            style={{ width: "100%"}}
        >
            <button onClick={toggleStep1Visibility} className="btn btn-primary w-100">
                Add Medicine
            </button>

            {isStep1Visible &&(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="container d-flex justify-content-center align-items-center vh-100">
                            <div
                                className="card shadow"
                                style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
                            >
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-md-10">
                                            <h2 className="card-title" style={{ textAlign: "left",fontSize: 18 }}>MEDICINE INFORMATION</h2>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                                            <button onClick={toggleStep1Visibility} type="button" className="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <MedInfo />
                                    <div className="row mb-3 d-flex align-items-center justify-content-end">
                                        <button onClick={() => {
                                            toggleStep1Visibility();
                                            toggleStep2Visibility();
                                        }} className="btn btn-primary"
                                        style={{ width: "45%" }}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isStep2Visible &&(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="container d-flex justify-content-center align-items-center vh-100">
                            <div
                                className="card shadow"
                                style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
                            >
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-md-10">
                                            <h2 className="card-title" style={{ textAlign: "left",fontSize: 18 }}>MEDICINE INFORMATION - SET TIME</h2>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                                            <button onClick={toggleStep2Visibility} type="button" className="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <SetTime />
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <button onClick={() => {
                                                toggleStep1Visibility();
                                                toggleStep2Visibility();
                                            }} className="btn btn-primary w-100">
                                                Back
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button onClick={() => {
                                                toggleStep2Visibility();
                                                toggleStep3Visibility();
                                            }} className="btn btn-primary w-100">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isStep3Visible &&(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="container d-flex justify-content-center align-items-center vh-100">
                            <div
                                className="card shadow"
                                style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
                            >
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-md-10">
                                            <h2 className="card-title" style={{ textAlign: "left",fontSize: 16 }}>MEDICINE INFORMATION - SET TIME - SET DATE</h2>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                                            <button onClick={toggleStep3Visibility} type="button" className="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <SetDate />
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <button onClick={() => {
                                                toggleStep2Visibility();
                                                toggleStep3Visibility();
                                            }} className="btn btn-primary w-100">
                                                Back
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button onClick= {toggleStep3Visibility} className="btn btn-primary w-100">
                                                Set Schedule
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AddMedicineBtn;
