import React from "react";
import Colors from "../../../../theme/Colors";

interface MissedCardProps {
  medicationName: string;
  missedTime: string;
  lateBy: string;
  isSevereLate: boolean;
}

const MissedCard: React.FC<MissedCardProps> = ({
  medicationName,
  missedTime,
  lateBy,
  isSevereLate,
}) => {
  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: isSevereLate
          ? Colors.warningRed00
          : Colors.warningOrage00,
      }}
    >
      <div style={styles.header}>
        <h3 style={styles.heading}>{medicationName}</h3>
        <p style={styles.paragraph}>{missedTime}</p>
      </div>
      <p style={styles.paragraph}>Late by: {lateBy}</p>
    </div>
  );
};

export default MissedCard;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    padding: "1rem",
    borderRadius: 8,
    color: "white",
    fontSize: 14,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  heading: {
    fontSize: 20,
    marginBottom: 8,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  paragraph: {
    marginBottom: 0,
  },
};
