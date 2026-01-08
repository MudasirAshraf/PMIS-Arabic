import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import DocumentLinkModal from "../../modals/documentlink-modal/DocumentLinkModal";
import "./addocuments.scss";

const AddDocuments = ({ goToNextTab, goToPreviousTab }) => {
  const [documents, setDocuments] = useState([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const handleSaveDocument = (newDoc) => {
    setDocuments((prev) => [...prev, newDoc]);
    setShowDocumentModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="add-document-header-container">
        <div
          className="sub-header-add-document"
          onClick={() => setShowDocumentModal(true)}
        >
          <IoMdAdd className="add-document-icon" />
          <p className="fs-md fw-700 lh-1-2">ربط المستند</p>
        </div>
      </div>
      {/* Document-Table */}
      <div className="project-stack-table-wrapper">
        <table className="project-stack-table">
          <thead className="fs-md fw-700 lh-1-2">
            <tr>
              <th>اسم المستند</th>
              <th>تعديل بواسطة</th>
              <th>تاريخ التحميل</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1-2">
            {documents.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "start", padding: "10px" }}>
                  لا يوجد
                </td>
              </tr>
            ) : (
              documents.map((doc, idx) => (
                <tr key={idx}>
                  <td>{doc.name}</td>
                  <td>{doc.modifiedBy}</td>
                  <td>{doc.uploadDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Link Document Modal */}
      <DocumentLinkModal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        onSave={handleSaveDocument}
      />

      {/* Shuffle-Buttons */}
      <div className="shuffle-btns-container">
        {goToPreviousTab && (
          <button className="prev fs-md fw-600 lh-1-2" onClick={goToPreviousTab}>
            السابق
          </button>
        )}
        {goToNextTab && (
          <button className="next fs-md fw-600 lh-1-2" onClick={goToNextTab}>
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

export default AddDocuments;
