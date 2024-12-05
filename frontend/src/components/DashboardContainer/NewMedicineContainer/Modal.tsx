import React from "react";
import colors from "../../../theme/Colors";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  clearData?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  clearData,
}) => {
  // Handle both clearing data and closing modal
  const handleClose = () => {
    if (clearData) {
      clearData(); // Clear the data first
    }
    onClose(); // Then close the modal
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{title}</h2>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ fontSize: "16px" }}
          />
        </div>
        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: `${colors.white00}`,
    padding: "32px",
    borderRadius: "8px",
    boxShadow: `0 4px 8px ${colors.gray00}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: "90%",
    width: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${colors.gray00}`,
    marginBottom: "16px",
    paddingBottom: "16px",
  },
  modalTitle: {
    fontSize: "24px",
    margin: 0,
  },
  modalBody: {
    flex: 1,
  },
};
