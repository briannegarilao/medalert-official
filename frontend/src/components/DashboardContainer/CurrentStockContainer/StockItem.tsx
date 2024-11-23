import React from "react";

interface StockItemProps {
  name: string;
  remainingStock: number;
  hasStock: boolean;
}

const StockItem: React.FC<StockItemProps> = ({ name, remainingStock, hasStock }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-2 d-flex align-items-center justify-content-center">
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: hasStock ? "green" : "red",
            borderRadius: "50%",
          }}
        ></div>
      </div>
      <div className="col-md-10">
        <label className="form-label" style={{ margin: "0" }}>
          {name}
        </label>
        <p style={{ margin: "0", color: "gray" }}>
          Remaining Stock: {remainingStock}
        </p>
      </div>
    </div>
  );
};

export default StockItem;
