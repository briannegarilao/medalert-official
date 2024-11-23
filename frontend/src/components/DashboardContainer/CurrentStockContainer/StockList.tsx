import React from "react";
import StockItem from "./StockItem";

interface StockListProps {
  data: {
    name: string;
    remainingStock: number;
    hasStock: boolean;
  }[];
}

const StockList: React.FC<StockListProps> = ({ data }) => {
  return (
    <div
      style={{
        maxHeight: "120px",
        overflowY: "auto",
        overflowX: "hidden",
        paddingRight: "0.5rem",
      }}
    >
      {data.map((item, index) => (
        <StockItem
          key={index}
          name={item.name}
          remainingStock={item.remainingStock}
          hasStock={item.hasStock}
        />
      ))}
    </div>
  );
};

export default StockList;
