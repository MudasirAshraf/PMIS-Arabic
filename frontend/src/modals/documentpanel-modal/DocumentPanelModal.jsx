import React, { useState, useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import "./documentmodal.scss";



const DocumentPanelModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "📜",
    modifiedBy: "",
    modifiedDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updated = { ...prevErrors };
        delete updated[name];
        return updated;
      });
    }
  };

  // Add
  const handleAdd = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "مطلوب";
    if (!formData.modifiedDate.trim()) newErrors.modifiedDate = "مطلوب";
    if (!formData.type.trim()) newErrors.type = "مطلوب";
    if (!formData.modifiedBy.trim()) newErrors.modifiedBy = "مطلوب";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setErrors({});
    onAdd({ ...formData, id: Date.now() });
    setFormData({ name: "", type: "📜", modifiedBy: "", modifiedDate: "" });
    onClose();
    toast.success("تمت إضافة المستند بنجاح");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="add-doc-panel-modal-overlay">
      <div className="add-doc-panel-modal-content">
        <div className="add-doc-panel-modal-header">
          <div className="add-doc-panel-header-title">
            <GrAppsRounded size={20} className="project-icon" />
            <p className="panel-header-para fs-lg fw-700 lh-1-2">
              إضافة مستند جديد
            </p>
          </div>
          <button className="add-doc-panel-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="add-doc-panel-modal-body">
          <label className="fs-md lh-1-2 fw-700">الاسم</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="fs-md lh-1 fw-500"
          />
          {errors.name && (
            <span className="error fs-sm fw-700 lh-1">{errors.name}</span>
          )}
          <label className="fs-md lh-1-2 fw-700">النوع</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="fs-md lh-1 fw-500"
          >
            <option value="📜">📜 مستند</option>
            <option value="📁">📁 مجلد</option>
          </select>
          {errors.type && (
            <span className="error fs-sm fw-700 lh-1">{errors.type}</span>
          )}

          <label className="fs-md lh-1-2 fw-700">تم التعديل بواسطة</label>
          <input
            type="text"
            name="modifiedBy"
            value={formData.modifiedBy}
            onChange={handleChange}
            className="fs-md lh-1 fw-500"
          />
          {errors.modifiedBy && (
            <span className="error fs-sm fw-700 lh-1">{errors.modifiedBy}</span>
          )}

          <label className="fs-md lh-1-2 fw-700">تاريخ التعديل</label>
          <input
            type="date"
            name="modifiedDate"
            value={formData.modifiedDate}
            onChange={handleChange}
            className="fs-md lh-1 fw-500"
          />
          {errors.modifiedDate && (
            <span className="error fs-sm fw-700 lh-1">
              {errors.modifiedDate}
            </span>
          )}
        </div>

        <div className="add-doc-panel-modal-footer">
          <button
            className="add-doc-cancel-button fs-md fw-600 lh-1"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="add-doc-save-button fs-md fw-600 lh-1"
            onClick={handleAdd}
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPanelModal;
