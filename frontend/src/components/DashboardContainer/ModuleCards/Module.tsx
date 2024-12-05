import React from "react";
import Colors from "../../../theme/Colors";

interface ModuleProps {
  title: string;
  children: React.ReactNode;
}

const Module: React.FC<ModuleProps> = ({ title, children }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>{title}</h2>
      <div style={styles.content}>{children}</div>
    </div>
  );
};

export default Module;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    height: "100%",
    padding: "1rem",
    borderRadius: 8,
    border: `1px solid ${Colors.gray00}`,
    boxShadow: `0 4px 8px ${Colors.gray00}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
    gap: 16,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    margin: 0,
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
};
