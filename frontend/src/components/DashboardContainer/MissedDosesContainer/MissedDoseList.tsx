import React from "react";
import MissedDoseItem from "./MissedDoseItem";

interface MissedDose {
  name: string;
  timeMissed: string;
}

interface MissedDoseListProps {
  data: MissedDose[];
}

const MissedDoseList: React.FC<MissedDoseListProps> = ({ data }) => (
  <div
    style={{
      maxHeight: "120px", // Set a max height for the scrollable container
      overflowY: "auto", // Add scroll when content exceeds maxHeight
      overflowX: "hidden",
      paddingRight: "0.5rem",
    }}
  >
    {data.map((dose, index) => (
      <MissedDoseItem
        key={index}
        name={dose.name}
        timeMissed={dose.timeMissed}
      />
    ))}
  </div>
);

export default MissedDoseList;
