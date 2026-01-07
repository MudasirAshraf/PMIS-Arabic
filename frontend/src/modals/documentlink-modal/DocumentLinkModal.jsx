import React, { useState, useEffect } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./linkmodal.scss";

const DocumentLinkModal = ({ isOpen, onClose, onSave }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (file) {
      onSave({
        name: file.name,
        modifiedBy: "أنت",
        uploadDate: new Date().toLocaleDateString(),
      });
      toast.success("تم ربط المستند بنجاح!");
      setTimeout(() => {
        onClose();
      }, 200);
      setFile(null);
      setError(null);
    } else {
      setError("يرجى اختيار ملف");
      toast.error("يرجى اختيار ملف قبل الحفظ");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="LinkModal-overlay">
      <div className="LinkModal-content">
        <div className="addlink-modal-header">
          <div className="sub-addlink-modal-header">
            <PiSquaresFour className="project-icon" />
            <h3>إضافة المستند</h3>
          </div>
          <button onClick={onClose} className="addlink-modal-close-btn">
            ×
          </button>
        </div>
        <div className="LinkModal-file-wrapper">
          <input
            type="file"
            onChange={handleFileChange}
            className="LinkModal-file-input fs-m fw-500 lh-1"
          />
          {error && <span className="error fs-sm fw-700 lh-1">{error}</span>}
        </div>

        <div className="LinkModal-actions">
          <button
            className="cancel-button fs-md fw-600 lh-1-2"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="save-button fs-md fw-600 lh-1-2"
            onClick={handleSave}
          >
            حفظ
          </button>
        </div>
      </div>
      {/* Toast-Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
        toastStyle={{
          backgroundColor: "rgba(1,113,98,1)",
          boxShadow: "none",
          color: "#FFF",
          fontSize: "14px",
          padding: "8px 12px",
        }}
      />
    </div>
  );
};

export default DocumentLinkModal;
