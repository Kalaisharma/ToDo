import { useState } from "react";

const statuses = ["Pending", "In Progress", "Completed"];

const StatusModal = ({ currentStatus, onClose, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: "20px" }}>Select Task Status</h2>
        <div style={statusListStyle}>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              style={{
                ...statusBtnStyle,
                backgroundColor:
                  selectedStatus === status ? "#007bff" : "#e0e0e0",
                color: selectedStatus === status ? "#fff" : "#333",
              }}
            >
              {status}
            </button>
          ))}
        </div>
        <div style={btnGroupStyle}>
          <button style={cancelBtnStyle} onClick={onClose}>
            Cancel
          </button>
          <button style={saveBtnStyle} onClick={() => onSave(selectedStatus)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const statusListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const statusBtnStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const cancelBtnStyle = {
  backgroundColor: "#ccc",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const saveBtnStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};
