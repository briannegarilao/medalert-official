import { useState } from "react";

function MedInfo() {
    
    const [selectedColor, setSelectedColor] = useState("");

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };
    
    return (
        <div className="card-body" style={{ width: "100%", maxWidth: "300px", margin:"0 auto"}}>
            <div className="row mb-3">
                <label htmlFor="medicineName" className="form-label">
                    Medicine Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="medicineName"
                    name="medicineName"
                    placeholder="Ex. Amoxicillin"
                />
            </div>
            <div className="row mb-3">
                <div className="col-md-5">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Antibiotics
                    </label>
                </div>
                <div className="col-md-1">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-check-label" htmlFor="exampleCheck1" style={{fontSize:12}}>
                        Non-Antibiotic Medication 
                    </label>
                </div>    
            </div>
            <div className="row mb-3">
                <label htmlFor="dosage" className="form-label">
                    Dosage
                </label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="dosage"
                        name="dosage"
                        placeholder="Ex. 100"
                    />
                    <select className="form-select" id="doseUnit" name="doseUnit">
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        <option value="mcg">mcg</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="specialInstruction" className="form-label">
                    Special Instruction
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="specialInstruction"
                    name="specialInstruction"
                    placeholder="Ex. after lunch"
                />
            </div>
            <div className="row mb-3">
                <label htmlFor="specialInstruction" className="form-label">
                    How many doses do you currently have left in stock?
                </label>
                <select className="form-select" id="stock" name="stock">
                    {Array.from({ length: 30 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="row mb-3">
                <label htmlFor="chooseColor" className="form-label">
                    Choose Color
                </label>
                <div className="d-flex">
                    {["purple", "blue", "green", "pink", "orange", "yellow"].map((color) => (
                        <div
                            key={color}
                            className="d-inline-block me-2"
                            onClick={() => handleColorChange(color)}
                            style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                cursor: "pointer",
                                border: selectedColor === color ? "2px solid #000" : "2px solid #ddd",
                                boxShadow: selectedColor === color ? "0 0 5px rgba(0,0,0,0.5)" : "none",
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MedInfo;