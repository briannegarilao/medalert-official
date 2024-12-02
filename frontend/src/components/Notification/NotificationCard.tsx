import React, { useEffect } from "react";
import Colors from "../../theme/Colors";

interface NotificationCardProps {
  medicineName: string;
  time: string;
  onClose: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  medicineName,
  time,
  onClose,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 120000); // Auto-dismiss after 120 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div style={styles.container}>
      <div style={styles.upperPart}>
        <h3 style={styles.heading}>ON-TIME MEDICATION</h3>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          style={styles.closeBtn}
          onClick={onClose}
        />
      </div>
      <p style={styles.paragraph}>
        Time for your {medicineName}! 💊 It's {time}. Take it now to stay on
        track and feel great! You've got this! 💪
      </p>
    </div>
  );
};

export default NotificationCard;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: 400,
    backgroundColor: Colors.notifBlue00,
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
