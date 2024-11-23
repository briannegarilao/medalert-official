import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div
    className="card shadow"
    style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
  >
    <div className="card-body">
      <h2
        className="card-title"
        style={{ textAlign: "left", fontSize: 20 }}
      >
        {title}
      </h2>
      {children}
    </div>
  </div>
);

export default Card;
