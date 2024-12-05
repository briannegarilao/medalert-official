import React, { useEffect } from "react";
import Colors from "../../theme/Colors";

interface NotificationCardProps {
  medicineName: string;
  time: string;
  onClose: () => void;
  type: "normal" | "warning" | "missed"; // Add type prop to determine card type
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  medicineName,
  time,
  onClose,
  type,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 120000); // Auto-dismiss after 120 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  // Determine the content based on the type
  const getContent = () => {
    switch (type) {
      case "normal":
        return {
          heading: "ON-TIME MEDICATION",
          message: `Time for your ${medicineName}! 💊 It's ${time}. Take it now to stay on track and feel great! You've got this! 💪`,
          backgroundColor: Colors.notifBlue00,
        };
      case "warning":
        return {
          heading: "MEDICATION REMINDER",
          message: `You missed taking your ${medicineName} on time! 💊 It's ${time}. Please take it now to stay on track!`,
          backgroundColor: Colors.warningOrage00,
        };
      case "missed":
        return {
          heading: "MISSED MEDICATION",
          message: `Your ${medicineName} scheduled at ${time} is severely overdue! 🚨 Please take it immediately and stay safe.`,
          backgroundColor: Colors.warningRed00,
        };
      default:
        return {
          heading: "NOTIFICATION",
          message: "",
          backgroundColor: Colors.gray00,
        };
    }
  };

  const { heading, message, backgroundColor } = getContent();

  return (
    <div style={{ ...styles.container, backgroundColor }}>
      <div style={styles.upperPart}>
        <h3 style={styles.heading}>{heading}</h3>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          style={styles.closeBtn}
          onClick={onClose}
        />
      </div>
      <p style={styles.paragraph}>{message}</p>
    </div>
  );
};

export default NotificationCard;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: 400,
    borderRadius: 8,
    boxShadow: `0 4px 8px ${Colors.gray00}`,
    color: Colors.white00,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 16,
    right: 16,
    zIndex: 1000,
  },
  upperPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 24,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  paragraph: {
    marginBottom: 0,
  },
  closeBtn: {
    fontSize: "16px",
    color: Colors.white00,
  },
};
