import React from "react";
import Colors from "../../../../theme/Colors"; // Make sure Colors is imported

interface StockCardProps {
  medicationName: string;
  currentStock: number;
}

const StockCard: React.FC<StockCardProps> = ({
  medicationName = "No Name",
  currentStock = 0,
}) => {
  // Dynamically determine the background color based on currentStock
  const cardBackgroundColor = currentStock < 1 ? Colors.red00 : Colors.green00;

  return (
    <div style={{ ...styles.card, backgroundColor: cardBackgroundColor }}>
      <h3 style={styles.heading}>{medicationName}</h3>
      <p style={styles.paragraph}>Current Stock: {currentStock}</p>
    </div>
  );
};

export default StockCard;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    padding: "1rem",
    borderRadius: 8,
    color: "white",
    fontSize: 14,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  heading: {
    fontSize: 20,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 0,
  },
};
