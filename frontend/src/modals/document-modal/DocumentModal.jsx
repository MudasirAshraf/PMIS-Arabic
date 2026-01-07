import React, { useState, useEffect } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./documentmodal.scss";

const DocumentModal = ({ isOpen, onClose, onSave }) => {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!selectedDoc) {
      setError("يرجى اختيار مستند");
      toast.error("يرجى اختيار مستند");
      return;
    }

    onSave({
      name: selectedDoc,
      modifiedBy: "أنت",
      uploadDate: new Date().toLocaleDateString(),
    });

    toast.success("تم ربط المستند بنجاح!");
    setSelectedDoc("");
    setError("");
    onClose();
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
    <div className="add-document-modal-overlay">
      <div className="add-document-modal-box">
        <div className="adddocument-modal-header">
          <div className="sub-adddocument-modal-header">
            <PiSquaresFour className="project-icon" />
            <h3>تحديث المستند - ربط ملف</h3>
          </div>
          <button onClick={onClose} className="adddocument-modal-close-btn">
            ×
          </button>
        </div>

        <div className="add-document-modal-body">
          <label className="add-document-modal-label fs-md fw-700 lh-1-2">
            المستندات <span className="add-document-modal-required">*</span>
          </label>
          <select
            value={selectedDoc}
            onChange={(e) => {
              setSelectedDoc(e.target.value);
              if (e.target.value) setError("");
            }}
            className="add-document-modal-select fs-m fw-500 lh-1"
          >
            <option value="">...اختر</option>
            <option value="مستند 1">مستند 1</option>
            <option value="مستند 2">مستند 2</option>
          </select>
          {error && <div className="error fs-sm fw-700 lh-1 mt-1">{error}</div>}
        </div>

        <div className="add-document-modal-footer">
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
    </div>
  );
};

export default DocumentModal;
