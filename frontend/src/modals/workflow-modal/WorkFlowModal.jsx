import React, { useState } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { FaFileDownload, FaTimes, FaEye } from "react-icons/fa";
import "./workflowmodal.scss";

const WorkflowModal = ({ onClose, workflowData }) => {
  const [pdfPreview, setPdfPreview] = useState(null);

  const handleFileClick = (file) => {
    if (file.type === "pdf") {
      setPdfPreview(file.url);
    } else {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="workflow-modal-overlay">
      <div className="workflow-modal-content">
        {/* Header */}
        <div className="workflow-modal-header">
          <div className="second-header-workflow-modal">
            <PiSquaresFour className="project-icon" />
            <h2 className="fs-lg fw-700 lh-1-2">مخطط سير المشروع</h2>
          </div>
          <button onClick={onClose} className="workflow-close-btn">
            ×
          </button>
        </div>

        {/* Boxes */}
        <div className="info-boxes">
          {Object.entries(workflowData).map(([key, value]) => {
            if (key === "attachments") return null;
            return (
              <div className="info-box" key={key}>
                <h4 className="fs-md fw-700 lh-1">{key}</h4>
                <p className="fs-m fw-600 lh-1-2">{value}</p>
              </div>
            );
          })}
        </div>

        {/* Attachments Section */}
        <div className="attachments-section">
          <div className="attachments-header">
            <h4 className="fs-lg fw-700 lh-1-2">المرفقات</h4>
            <span className="fs-sm fw-700 lh-1">
              {workflowData.attachments.length}
            </span>
          </div>
          {/* Table */}
          <div className="history-modal-container">
            <div className="history-table-scroll">
              <table className="attachments-table">
                <thead className="fs-md lh-1 fw-700">
                  <tr>
                    <th>الاسم</th>
                    <th>النوع</th>
                    <th>تاريخ التعديل</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody className="fs-m lh-1 fw-500">
                  {workflowData.attachments.map((file, i) => (
                    <tr key={i}>
                      <td>{file.name}</td>
                      <td>{file.type}</td>
                      <td>
                        {file.date
                          ? new Date(file.date).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        {file.type === "pdf" ? (
                          <FaEye
                            title="عرض"
                            className="icon-action"
                            onClick={() => handleFileClick(file)}
                          />
                        ) : (
                          <FaFileDownload
                            title="تحميل"
                            className="icon-action"
                            onClick={() => handleFileClick(file)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="modal-footer">
          <button
            className="cancel-button fs-md fw-600 lh-1-2"
            onClick={onClose}
          >
            إلغاء
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {pdfPreview && (
        <div className="pdf-modal" onClick={() => setPdfPreview(null)}>
          <FaTimes
            className="pdf-modal-close"
            onClick={(e) => {
              e.stopPropagation();
              setPdfPreview(null);
            }}
          />
          <iframe
            src={pdfPreview}
            title="PDF Preview"
            className="pdf-viewer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default WorkflowModal;
