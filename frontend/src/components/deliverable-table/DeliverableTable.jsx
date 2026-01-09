import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./deliverabletable.scss";

const DeliverableTable = ({ onDataLengthChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkedDocs, setLinkedDocs] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});

  const existingDocuments = [
    {
      id: "ex1",
      name: "مستند خارجي 1",
      modifiedBy: "أحمد",
      modifiedAt: "10/05/2025",
    },
    {
      id: "ex2",
      name: "مستند خارجي 2",
      modifiedBy: "سارة",
      modifiedAt: "15/05/2025",
    },
  ];

  // Required Fields
  const fieldLabels = {
    name: "اسم المرحلة",
    startDate: "تاريخ البداية",
    endDate: "تاريخ النهاية",
    planned: "% نسبة المخطط",
    achieved: "% نسبة الإنجاز",
    cost: "التكلفة",
    delivered: "المؤشر",
    status: "الحالة",
    phase: "مرحلة سير العمل",
  };

  const requiredFields = Object.keys(fieldLabels);

  // Validate
  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!selectedItem[field] || selectedItem[field].trim() === "") {
        newErrors[field] = "مطلوب";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (item) => {
    setSelectedItem({ ...item });
    setDocuments([]);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setDocuments([]);
    setIsModalOpen(false);
    setIsLinkModalOpen(false);
    setLinkedDocs([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleAddDocumentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: Date.now(),
      name: file.name,
      modifiedBy: "أنت",
      modifiedAt: new Date().toLocaleDateString("ar-EG"),
    };

    setDocuments((prev) => [...prev, newDoc]);
    e.target.value = null;
  };

  const handleRemoveDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleSubmit = () => {
    if (documents.length === 0) return;
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    console.log("تم الإرسال:", selectedItem, documents);
    setShowConfirmModal(false);
    handleClose();
  };

  const [deliverablesData, setDeliverablesData] = useState([
    {
      id: 1,
      name: "مرحلة التخطيط",
      startDate: "01/01/2023",
      endDate: "15/02/2023",
      planned: "100%",
      achieved: "100%",
      cost: "150,000.00",
      delivered: "150,000.00",
      status: "مغلق",
      phase: "تم الإنجاز",
    },
    {
      id: 2,
      name: "مرحلة التصميم",
      startDate: "16/02/2023",
      endDate: "31/03/2023",
      planned: "100%",
      achieved: "90%",
      cost: "200,000.00",
      delivered: "180,000.00",
      status: "مفتوح",
      phase: "قيد التنفيذ",
    },
    {
      id: 3,
      name: "مرحلة التنفيذ 1",
      startDate: "01/04/2023",
      endDate: "30/04/2023",
      planned: "100%",
      achieved: "100%",
      cost: "300,000.00",
      delivered: "300,000.00",
      status: "مغلق",
      phase: "تم الإنجاز",
    },
    {
      id: 4,
      name: "مرحلة التنفيذ 2",
      startDate: "01/05/2023",
      endDate: "31/05/2023",
      planned: "100%",
      achieved: "75%",
      cost: "250,000.00",
      delivered: "187,500.00",
      status: "مفتوح",
      phase: "قيد التنفيذ",
    },
    {
      id: 5,
      name: "مرحلة المتابعة",
      startDate: "01/06/2023",
      endDate: "15/06/2023",
      planned: "100%",
      achieved: "50%",
      cost: "100,000.00",
      delivered: "50,000.00",
      status: "مفتوح",
      phase: "قيد التحديث",
    },
    {
      id: 6,
      name: "مرحلة التسليم",
      startDate: "16/06/2023",
      endDate: "30/06/2023",
      planned: "100%",
      achieved: "100%",
      cost: "180,000.00",
      delivered: "180,000.00",
      status: "مغلق",
      phase: "تم الإنجاز",
    },
  ]);

  const renderCell = (value) => (
    <span
      className="cell-text"
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--tooltip-top",
          `${rect.top + rect.height}px`
        );
        e.currentTarget.style.setProperty("--tooltip-left", `${rect.left}px`);
      }}
      data-fulltext={value ?? "_"}
    >
      {value ?? "_"}
    </span>
  );

  useEffect(() => {
    onDataLengthChange?.(deliverablesData.length);
  }, [deliverablesData, onDataLengthChange]);

  return (
    <div className="deliverables-table-container">
      <table className="deliverables-table">
        <thead className="fs-md fw-500 lh-1-2 text-center">
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
            <th>% نسبة المخطط</th>
            <th>% نسبة الإنجاز</th>
            <th>التكلفة</th>
            <th>المؤشر</th>
            <th>الحالة</th>
            <th>مرحلة سير العمل</th>
            <th>✎</th>
          </tr>
        </thead>
        <tbody className="fs-m fw-500 lh-1-2 text-center">
          {deliverablesData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{renderCell(item.name)}</td>
              <td>{renderCell(item.startDate)}</td>
              <td>{renderCell(item.endDate)}</td>
              <td>{renderCell(item.planned)}</td>
              <td>{renderCell(item.achieved)}</td>
              <td>{renderCell(item.cost)}</td>
              <td>{renderCell(item.delivered)}</td>
              <td>{renderCell(item.status)}</td>
              <td>{renderCell(item.phase)}</td>

              <td>
                <button
                  onClick={() => handleEdit(item)}
                  className="edit-button"
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Deliverable-Modal */}
      {isModalOpen && (
        <div className="deliverable-modal-overlay">
          <div className="deliverable-modal-content">
            <div className="deliverable-modal-header">
              <div className="second-header-deliverable-modal">
                <PiSquaresFour className="project-icon" />
                <h2 className="fs-lg fw-700 lh-1-2">تحديث المخرج</h2>
              </div>
              <button className="deliverable-close-btn" onClick={handleClose}>
                ×
              </button>
            </div>

            <div className="deliverable-row row-I">
              <div>
                <label className="fs-md fw-700 lh-1-2">اسم المرحلة</label>
                <input
                  name="name"
                  value={selectedItem.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span className="error fs-sm fw-700 lh-1">{errors.name}</span>
                )}
              </div>
              <div>
                <label className="fs-md fw-700 lh-1-2">تاريخ البداية</label>
                <input
                  name="startDate"
                  value={selectedItem.startDate}
                  onChange={handleInputChange}
                />
                {errors.startDate && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.startDate}
                  </span>
                )}
              </div>
            </div>

            <div className="deliverable-row row-II">
              <div>
                <label className="fs-md fw-700 lh-1-2">تاريخ النهاية</label>
                <input
                  name="endDate"
                  value={selectedItem.endDate}
                  onChange={handleInputChange}
                />
                {errors.endDate && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.endDate}
                  </span>
                )}
              </div>
              <div>
                <label className="fs-md fw-700 lh-1-2">% نسبة المخطط</label>
                <input
                  name="planned"
                  value={selectedItem.planned}
                  onChange={handleInputChange}
                />
                {errors.planned && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.planned}
                  </span>
                )}
              </div>
              <div>
                <label className="fs-md fw-700 lh-1-2">% نسبة الإنجاز</label>
                <input
                  name="achieved"
                  value={selectedItem.achieved}
                  onChange={handleInputChange}
                />
                {errors.achieved && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.achieved}
                  </span>
                )}
              </div>
              <div>
                <label className="fs-md fw-700 lh-1-2">التكلفة</label>
                <input
                  name="cost"
                  value={selectedItem.cost}
                  onChange={handleInputChange}
                />
              </div>
              {errors.cost && (
                <span className="error fs-sm fw-700 lh-1">{errors.cost}</span>
              )}
            </div>

            <div className="deliverable-row row-III">
              <div>
                <label className="fs-md fw-700 lh-1-2">المؤشر</label>
                <input
                  name="delivered"
                  value={selectedItem.delivered}
                  onChange={handleInputChange}
                />
                {errors.delivered && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.delivered}
                  </span>
                )}
              </div>
              <div>
                <label className="fs-md fw-700 lh-1-2">الحالة</label>
                <input
                  name="status"
                  value={selectedItem.status}
                  onChange={handleInputChange}
                />
                {errors.status && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.status}
                  </span>
                )}
              </div>
              <div>
                <label className="fs-md fw-700 lh-1-2">مرحلة سير العمل</label>
                <input
                  name="phase"
                  value={selectedItem.phase}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <hr className="inputs-separator" />
            <div className="documents-header-deliverable">
              <h3 className="fs-lg fw-700 lh-1-2">
                جميع المستندات{" "}
                <span className="fs-m lh-1-4 fw-700">{documents.length}</span>
              </h3>
              <div className="documents-buttons-deliverable">
                <button
                  onClick={handleAddDocumentClick}
                  className="save-button fs-md fw-700 lh-1-2"
                >
                  إضافة مستند
                </button>
                <button
                  onClick={() => setIsLinkModalOpen(true)}
                  className="save-button fs-md fw-700 lh-1-2"
                >
                  ربط المستند
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            {/* Second-Table */}
            <div className="deliverables-table-container-II">
              <table className="deliverable-documents-table">
                <thead className="fs-md fw-700 lh-1-2">
                  <tr>
                    <th>اسم المستند</th>
                    <th>تعديل بواسطة</th>
                    <th>تاريخ التعديل</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody className="fs-md fw-600 lh-1-2">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.name}</td>
                        <td>{doc.modifiedBy}</td>
                        <td>{doc.modifiedAt}</td>
                        <td>
                          <button onClick={() => handleRemoveDocument(doc.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>لا توجد مستندات</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="deliverable-modal-actions">
              <button onClick={handleClose} className="cancel-button">
                إلغاء
              </button>
              <button
                onClick={() => {
                  if (validate()) {
                    setDeliverablesData((prevData) =>
                      prevData.map((item) =>
                        item.id === selectedItem.id ? selectedItem : item
                      )
                    );
                    toast.success("تم الحفظ بنجاح!");
                    handleClose();
                  } else {
                    toast.error("يرجى تعبئة جميع الحقول المطلوبة");
                  }
                }}
                className="save-button"
              >
                حفظ
              </button>
              <button
                onClick={handleSubmit}
                disabled={documents.length === 0}
                style={{
                  backgroundColor: documents.length > 0 ? "red" : "#ccc",
                  color: "#fff",
                  cursor: documents.length > 0 ? "pointer" : "not-allowed",
                }}
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}

      {isLinkModalOpen && (
        <div className="deliverable-custom-modal-overlay">
          <div className="deliverable-custom-modal-content">
            <div className="deliverable-modal-header">
              <div className="second-header-deliverable-modal">
                <PiSquaresFour className="project-icon" />
                <h2 className="fs-lg fw-700 lh-1-2"> اختيار مستندات للربط</h2>
              </div>
              <button
                className="deliverable-close-btn"
                onClick={() => setIsLinkModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="linked-documents-table-container">
              <table className="linked-documents-table">
                <thead>
                  <tr>
                    <th>اختيار</th>
                    <th>اسم المستند</th>
                    <th>تعديل بواسطة</th>
                    <th>تاريخ التعديل</th>
                  </tr>
                </thead>
                <tbody>
                  {existingDocuments.map((doc) => {
                    const isChecked = linkedDocs.some((d) => d.id === doc.id);
                    return (
                      <tr key={doc.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setLinkedDocs((prev) =>
                                  prev.filter((d) => d.id !== doc.id)
                                );
                              } else {
                                setLinkedDocs((prev) => [...prev, doc]);
                              }
                            }}
                          />
                        </td>
                        <td>{doc.name}</td>
                        <td>{doc.modifiedBy}</td>
                        <td>{doc.modifiedAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="linked-modal-actions">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="cancel-button"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  const newDocs = linkedDocs.filter(
                    (linkedDoc) => !documents.some((d) => d.id === linkedDoc.id)
                  );
                  setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
                  setIsLinkModalOpen(false);
                  setLinkedDocs([]);
                }}
                className="save-button"
              >
                ربط
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation-Modal */}
      {showConfirmModal && (
        <div className="deliverable-custom-modal-overlay">
          <div className="confirm-custom-modal-content">
            <h3 className="confirm-text-para">
              هل أنت متأكد من تقديم هذا المخرج؟
            </h3>
            <div className="linked-modal-actions">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="cancel-button"
              >
                لا
              </button>
              <button onClick={confirmSubmit} className="save-button">
                نعم
              </button>
            </div>
          </div>
        </div>
      )}
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

export default DeliverableTable;
