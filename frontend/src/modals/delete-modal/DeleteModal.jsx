import React from 'react';
import "./deletemodal.scss";

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="delete-modal">
        <div className="delete-modal-content">
          <p className="fs-lg fw-600 lh-1-2">هل أنت متأكد أنك تريد الحذف؟</p>
          <div className="modal-actions">
            <button className="confirm-btn fs-lg fw-600 lh-1-2" onClick={onConfirm}>نعم</button>
            <button className="cancel-btn fs-lg fw-600 lh-1-2" onClick={onCancel}>لا</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteModal;
  