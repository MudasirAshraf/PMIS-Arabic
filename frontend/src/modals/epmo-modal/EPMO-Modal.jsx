import React, { useState, useEffect } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./epmomodal.scss";

const EPMOModal = ({ isOpen, onClose, onSave, initialData, mode }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    type: "",
    description: "",
    startDate: "",
    expectedEnd: "",
    closeDate: "",
    priority: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const requiredFields = [
    "id",
    "title",
    "type",
    "description",
    "startDate",
    "expectedEnd",
    "closeDate",
    "priority",
    "status",
  ];

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "مطلوب";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
    } else {
      setFormData({
        id: "",
        title: "",
        type: "",
        description: "",
        startDate: "",
        expectedEnd: "",
        closeDate: "",
        priority: "",
        status: "",
      });
      setErrors({});
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      if (mode === "add") {
      } else {
      }
      onSave(formData);
      toast.success("تم الحفظ بنجاح!");
      onClose();
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="epmo-modal-overlay">
      <div className="epmo-modal">
        <div className="epmo-modal-header">
          <div className="sub-modal-header-epmo">
            <PiSquaresFour className="project-icon" />
            <h2 className="fs-md fw-600 lh-1-2"> إضافة صاحب العلاقة</h2>
          </div>
          <button onClick={onClose} className="epmo-close-btn">
            ×
          </button>
        </div>

        <div className="modal-body epmo-grid">
          <div className="row">
            <div className="epmo-field">
              <label htmlFor="id" className="fs-md fw-700 lh-1-2">
                رمز الملاحظة
              </label>
              <input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              {errors.id && (
                <span className="error fs-sm fw-700 lh-1">{errors.id}</span>
              )}
            </div>
            <div className="epmo-field">
              <label htmlFor="title" className="fs-md fw-700 lh-1-2">
                عنوان الملاحظة *
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <span className="error fs-sm fw-700 lh-1">{errors.title}</span>
              )}
            </div>
            <div className="epmo-field">
              <label htmlFor="type" className="fs-md fw-700 lh-1-2">
                تصنيف الملاحظة
              </label>
              <input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              {errors.type && (
                <span className="error fs-sm fw-700 lh-1">{errors.type}</span>
              )}
            </div>
            <div className="epmo-field">
              <label htmlFor="priority" className="fs-md fw-700 lh-1-2">
                الأولوية *
              </label>
              <input
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              />
              {errors.priority && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.priority}
                </span>
              )}
            </div>
          </div>

          <div className="row second-row">
            <div className="epmo-field" style={{ flex: 1 }}>
              <label htmlFor="description" className="fs-md fw-700 lh-1-2">
                وصف الملاحظة *
              </label>
              <textarea
                id="description"
                name="description"
                className="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="stacked-inputs">
              <div className="epmo-field">
                <label htmlFor="startDate" className="fs-md fw-700 lh-1-2">
                  تاريخ البدء *
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.startDate}
                  </span>
                )}
              </div>
              <div className="epmo-field">
                <label htmlFor="expectedEnd" className="fs-md fw-700 lh-1-2">
                  تاريخ الانتهاء المتوقع *
                </label>
                <input
                  id="expectedEnd"
                  name="expectedEnd"
                  type="date"
                  value={formData.expectedEnd}
                  onChange={handleChange}
                />
                {errors.expectedEnd && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.expectedEnd}
                  </span>
                )}
              </div>
              <div className="epmo-field">
                <label htmlFor="closeDate" className="fs-md fw-700 lh-1-2">
                  تاريخ الإغلاق *
                </label>
                <input
                  id="closeDate"
                  name="closeDate"
                  type="date"
                  value={formData.closeDate}
                  onChange={handleChange}
                />
                {errors.closeDate && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.closeDate}
                  </span>
                )}
              </div>
              <div className="epmo-field">
                <label htmlFor="status" className="fs-md fw-700 lh-1-2">
                  الحالة *
                </label>
                <input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                />
                {errors.status && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="epmo-modal-actions">
          <button
            onClick={onClose}
            className="cancel-button fs-lg fw-600 lh-1-2"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="save-button fs-lg fw-600 lh-1-2"
          >
            حفظ
          </button>
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
    </div>
  );
};

export default EPMOModal;
