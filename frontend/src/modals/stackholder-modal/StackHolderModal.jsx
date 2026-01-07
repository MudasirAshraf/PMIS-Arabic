import React, { useState, useEffect } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./stackholdermodal.scss";

const StakeholderModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    department: "",
    reviewer: "",
    relatedToProject: "",
    includedInDoc: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.relatedToProject) newErrors.relatedToProject = "مطلوب";
    if (!formData.includedInDoc) newErrors.includedInDoc = "مطلوب";
    if (!formData.notes) newErrors.notes = "مطلوب";
    if (!formData.reviewer) newErrors.reviewer = "مطلوب";
    if (!formData.department) newErrors.department = "مطلوب";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updated = { ...prevErrors };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    onSave({ ...formData, isSigned: false });
    toast.success("تم الحفظ بنجاح!");
    setTimeout(() => {
      onClose();
      setFormData({
        department: "",
        reviewer: "",
        relatedToProject: "",
        includedInDoc: "",
        notes: "",
      });
      setErrors({});
    }, 200);
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
    <div className="stakeholder-modal-overlay">
      <div className="stakeholder-modal-container">
        <div className="stackholder-modal-header">
          <div className="sub-stackholder-modal-header">
            <PiSquaresFour className="project-icon" />
            <h3>إضافة صاحب العلاقة</h3>
          </div>
          <button onClick={onClose} className="stakeholder-modal-close-btn">
            ×
          </button>
        </div>
        <div className="stakeholder-modal-body">
          <div className="stakeholder-modal-form-group">
            <label className="fs-m lh-1-2 fw-700">اسم الإدارة المشاركة</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="اسم الإدارة المشاركة"
              className="fs-m fw-500 lh-1-1"
            />
            {errors.department && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.department}
              </span>
            )}
          </div>
          <div className="stakeholder-modal-form-group">
            <label className="fs-m lh-1-2 fw-700">اسم المراجع</label>
            <select
              name="reviewer"
              value={formData.reviewer}
              onChange={handleChange}
              className="fs-m fw-500"
            >
              <option value="">PPM account : null</option>
              <option value="مراجع 1">مراجع 1</option>
              <option value="مراجع 2">مراجع 2</option>
            </select>
            {errors.reviewer && (
              <span className="error fs-sm fw-700 lh-1">{errors.reviewer}</span>
            )}
          </div>
          <div className="stakeholder-modal-form-group">
            <label className="fs-m lh-1-2 fw-700">
              هل تملك علاقة بالمشروع؟{" "}
              <span className="stakeholder-modal-required">*</span>
            </label>
            <select
              name="relatedToProject"
              value={formData.relatedToProject}
              onChange={handleChange}
              className="fs-m fw-500"
            >
              <option value="">اختر</option>
              <option value="نعم">نعم</option>
              <option value="لا">لا</option>
            </select>
            {errors.relatedToProject && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.relatedToProject}
              </span>
            )}
          </div>
          <div className="stakeholder-modal-form-group">
            <label className="fs-m lh-1-2 fw-700">
              هل أضيفت متطلباتكم في الكراسة؟{" "}
              <span className="stakeholder-modal-required">*</span>
            </label>
            <select
              name="includedInDoc"
              value={formData.includedInDoc}
              onChange={handleChange}
              className="fs-m fw-500"
            >
              <option value="">اختر</option>
              <option value="نعم">نعم</option>
              <option value="لا">لا</option>
            </select>
            {errors.includedInDoc && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.includedInDoc}
              </span>
            )}
          </div>
          <div className="stakeholder-modal-form-group stakeholder-modal-full-width">
            <label className="fs-m lh-1-2 fw-700">الملاحظات</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="الملاحظات"
              className="fs-m fw-500 lh-1"
            />
            {errors.notes && (
              <span className="error fs-sm fw-700 lh-1">{errors.notes}</span>
            )}
          </div>
        </div>
        <div className="stakeholder-modal-footer">
          <button
            className="cancel-button fs-md fw-600 lh-1-2"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="save-button fs-md fw-600 lh-1-2"
            onClick={handleSubmit}
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

export default StakeholderModal;
