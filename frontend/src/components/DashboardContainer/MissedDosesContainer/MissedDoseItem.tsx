import React from "react";

interface MissedDoseItemProps {
  name: string;
  timeMissed: string;
}

const MissedDoseItem: React.FC<MissedDoseItemProps> = ({ name, timeMissed }) => (
  <div className="row mb-3">
    <div className="col-md-2 d-flex align-items-center justify-content-center">
      <i className="bi bi-exclamation-diamond"></i>
    </div>
    <div className="col-md-10">
      <label
        className="form-label"
        style={{ margin: "0" }}
      >
        {name}
      </label>
      <p style={{ margin: "0", color: "red" }}>{timeMissed}</p>
    </div>
  </div>
);

export default MissedDoseItem;
