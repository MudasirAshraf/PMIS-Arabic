import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import "./documentviewmodal.scss";

const DocumentViewModal = ({ doc, onClose }) => {
  useEffect(() => {
    if (doc) {
      document.body.classList.add("modal-open"); 
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [doc]);
  
  if (!doc) return null;

  const isPreviewAvailable = doc.type === "pdf" || doc.type === "image";

  return (
    <div className="modal-overlay-dv" onClick={onClose}>
      <div className="modal-content-dv" onClick={(e) => e.stopPropagation()}>
        <IoClose className="close-icon-dv" onClick={onClose} />
        <h2 className="modal-title-dv fs-lg lh-1-25 fw-700">{doc.title}</h2>

        {isPreviewAvailable ? (
          doc.type === "pdf" ? (
            <embed
              src={doc.file}
              className="file-preview-dv"
              type="application/pdf"
            />
          ) : (
            <img
              src={doc.file}
              alt={doc.title}
              className="file-preview-dv"
            />
          )
        ) : (
          <div className="preview-unavailable-container-dv">
            <p className="preview-unavailable-dv fs-md lh-1-2 fw-700">
              المعاينة غير متاحة لهذا النوع من الملفات
            </p>
            <a href={doc.file} download className="download-icon-dv fs-md fw-600 lh-1-2">
              <FaDownload size={20} /> تحميل
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewModal;
