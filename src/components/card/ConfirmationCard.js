import React from "react";
import "./ConfirmationCard.css";

function ConfirmationCard({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-card">
      <p>{message}</p>
      <div className="buttons">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmationCard;
