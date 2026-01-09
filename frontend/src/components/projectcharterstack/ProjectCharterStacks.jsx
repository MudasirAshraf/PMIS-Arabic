import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import StakeholderModal from "../../modals/stackholder-modal/StackHolderModal";
import DocumentLinkModal from "../../modals/documentlink-modal/DocumentLinkModal";
import DocumentModal from "../../modals/document-modal/DocumentModal";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./projectcharterstack.scss";

const ProjectCharterStacks = ({ goToPreviousTab }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [stakeholders, setStakeholders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isDocModalOpen, setDocModalOpen] = useState(false);
  const [isAddDocModalOpen, setAddDocModalOpen] = useState(false);

  const handleSave = (newStakeholder) => {
    setStakeholders((prev) => [...prev, newStakeholder]);
    setModalOpen(false);
  };

  const handleSaveDocument = (newDoc) => {
    setDocuments((prev) => [...prev, newDoc]);
    setDocModalOpen(false);
  };

  const handleAddDocument = (newDoc) => {
    setDocuments((prev) => [...prev, newDoc]);
    setAddDocModalOpen(false); 
  };

  const renderCell = (value) => (
  <span
    className="cell-text"
    onMouseEnter={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--tooltip-top",
        `${rect.top + rect.height}px`
      );
      e.currentTarget.style.setProperty(
        "--tooltip-left",
        `${rect.left}px`
      );
    }}
    data-fulltext={value ?? "_"}
  >
    {value ?? "_"}
  </span>
);


  return (
    <div>
      {/* ========== Stakeholder Section ========== */}
      <section className="stakeholder-section">
        <div
          className="container-charter-stack"
          onClick={() => setModalOpen(true)}
        >
          <div className="header-charter-stack">
            <IoMdAdd className="project-icon" />
            <p className="fs-md fw-700 lh-1-2">إضافة صاحب العلاقة</p>
          </div>
        </div>
        {/* Table */}
        <div className="project-stack-table-wrapper">
          <table className="project-stack-table">
            <thead className="fs-md fw-700 lh-1-2">
              <tr>
                <th>اسم المراجع</th>
                <th>اسم الجهة المشاركة</th>
                <th>هل تملك علاقة بالمشروع؟</th>
                <th>هل أضيفت ملاحظاتكم في الكراسة؟</th>
                <th>تم التوقيع</th>
                <th>الملاحظات</th>
              </tr>
            </thead>
            <tbody className="fs-m fw-500 lh-1-4">
              {stakeholders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "start", padding: "10px" }}
                  >
                    لا توجد بيانات
                  </td>
                </tr>
              ) : (
                stakeholders.map((s, idx) => (
                  <tr key={idx}>
                    <td>{renderCell(s.reviewer)}</td>
                    <td>{renderCell(s.department)}</td>
                    <td>{renderCell(s.relatedToProject)}</td>
                    <td>{renderCell(s.includedInDoc)}</td>
                    <td>{renderCell(s.isSigned ? "✅" : "-")}</td>
                    <td>{renderCell(s.notes)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <p className="project-stack-note fs-m fw-700 lh-1-2">
            حسب التوجيهات المعتمدة في وثيقة المشروع، إذا لم يتم تزويدنا بهذه
            البيانات خلال أسبوع، سيتم اعتماد النسخة النهائية للمشروع بدون أي
            مستندات إضافية.
          </p>
        </div>

        <StakeholderModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </section>

      {/* ========== Document Section ========== */}
      <section className="document-section">
        <div className="container">
          {/* Document-Summary */}
          <div className="document-summary">
            <span className="fs-md fw-700 lh-1">جميع المستندات</span>
            <span className="document-count fs-md fw-700 lh-1-4">{documents.length}</span>
          </div>

          {/* Header Actions */}
          <div className="document-buttons">
            <button
              className="document-buttons-I fs-md fw-700 lh-1-2"
              onClick={() => setDocModalOpen(true)}
            >
              ربط المستند
            </button>
            <button
              className="document-buttons-I fs-md fw-700 lh-1-2"
              onClick={() => setAddDocModalOpen(true)}
            >
              إضافة المستند
            </button>
          </div>
        </div>

        {/* Document Table */}
        <div className="project-stack-table-wrapper">
          <table className="project-stack-table">
            <thead className="fs-md fw-700 lh-1-2">
              <tr>
                <th>اسم المستند</th>
                <th>تعديل بواسطة</th>
                <th>تاريخ التحميل</th>
              </tr>
            </thead>
            <tbody className="fs-m fw-500 lh-1-4">
              {documents.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "start", padding: "10px" }}
                  >
                    لا يوجد
                  </td>
                </tr>
              ) : (
                documents.map((doc, idx) => (
                  <tr key={idx}>
                    <td>{renderCell(doc.name)}</td>
                    <td>{renderCell(doc.modifiedBy)}</td>
                    <td>{renderCell(doc.uploadDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer Note */}
          <p className="project-stack-note fs-m fw-700 lh-1-2">
            يرجى تزويدنا بكافة المستندات المطلوبة وإلا سيتم اعتماد المشروع بدون
            مستندات إضافية
          </p>
        </div>
        {/* Link Document Modal */}
        <DocumentLinkModal
          isOpen={isDocModalOpen}
          onClose={() => setDocModalOpen(false)}
          onSave={handleSaveDocument}
        />
        {/* Add Document Modal */}
        <DocumentModal
          isOpen={isAddDocModalOpen}
          onClose={() => setAddDocModalOpen(false)}
          onSave={handleAddDocument}
        />
      </section>
      {/* ========== Navigation Buttons ========== */}
      <div className="shuffle-btns-cotainer">
        {goToPreviousTab && (
          <button className="prev fs-md fw-600 lh-1-2" onClick={goToPreviousTab}>
            السابق
          </button>
        )}
        <button
          className="submit-stack-button fs-md fw-600 lh-1-2"
          onClick={() => toast.success("تم إرسال النموذج بنجاح")}
        >
          إرسال
        </button>
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
                fontSize: "1rem",
                padding: "8px 12px",
              }}
            />
      </div>
    </div>
  );
};

export default ProjectCharterStacks;
