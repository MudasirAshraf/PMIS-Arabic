import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./managerform.scss";

const ProjectManagerForm = ({ onClose, project, onSave, onChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    specialization: "",
    delivered: "",
    deliveryDate: "",
    previousManager: "",
  });

  const [errors, setErrors] = useState({});


  const toDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

  useEffect(() => {
    if (project) {
     const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }
  return dateStr; 
};

      setFormData({
        name: project.name,
        date: formatDate(project.date),
        specialization: project.specialization,
        delivered: project.delivered,
        deliveryDate: formatDate(project.deliveryDate),
        previousManager: project.previousManager,
      });
    }
  }, [project]); 

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "اسم مدير المشروع المرشح مطلوب";
    if (!formData.date) newErrors.date = "تاريخ الطلب مطلوب";
    if (!formData.specialization) newErrors.specialization = "التخصص مطلوب";
    if (!formData.delivered) newErrors.delivered = "الحالة المطلوبة مطلوبة";
    if (!formData.deliveryDate)
      newErrors.deliveryDate = "تاريخ تسليم المشروع مطلوب";
    if (!formData.previousManager)
      newErrors.previousManager = "اسم مدير المشروع السابق مطلوب";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (onChange) onChange(e);
  };



const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    toast.error("يرجى ملء جميع الحقول المطلوبة");
    return;
  }

  const updatedProject = {
    ...(project || {}),
    ...formData,
    date: toDisplayDate(formData.date),
    deliveryDate: toDisplayDate(formData.deliveryDate),
  };

  onSave(updatedProject);
  toast.success("تم الحفظ بنجاح");
};

  return (
    <div className="project-closure-form-overlay">
      <div className="project-closure-form-container">
        <div className="project-closure-form-header">
          <h2 className="fs-lg fw-700 lh-1-3">تعيين مدير المشروع</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="project-closure-form-content" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Form fields */}
            <div className="form-group">
              <label className="fs-md fw-600 lh-1-2">اسم مدير المشروع المرشح *</label>
              <select name="name" value={formData.name} onChange={handleChange} className="fs-sm fw-500 lh-1">
                <option value="PPM account-null">PPM account-null</option>
                <option value="Mudassir Ashraf - مُدَثِّر أشرف">
                  Mudassir Ashraf - مُدَثِّر أشرف
                </option>
                <option value="Mohammed Alrefai - محمد الرفاعي">
                  Mohammed Alrefai - محمد الرفاعي
                </option>
              </select>
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="fs-md fw-600 lh-1-2">تاريخ الطلب *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="fs-sm fw-500 lh-1"
              />
              {errors.date && <div className="error">{errors.date}</div>}
            </div>

            <div className="form-group">
              <label className="fs-md fw-600 lh-1-2">التخصص *</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="التخصص"
                className="fs-sm fw-500 lh-1"
              />
              {errors.specialization && (
                <div className="error">{errors.specialization}</div>
              )}
            </div>

            <div className="form-group">
              <label className="fs-md fw-600 lh-1-2">اسم مدير المشروع السابق</label>
              <input
                type="text"
                name="previousManager"
                value={formData.previousManager}
                onChange={handleChange}
                placeholder="اسم مدير المشروع السابق"
                className="fs-sm fw-500 lh-1"
              />
              {errors.previousManager && (
                <div className="error">{errors.previousManager}</div>
              )}
            </div>

            <div className="form-group">
              <label className="fs-md fw-600 lh-1-2">
                هل تم تسليم كافة وثائق المشروع لمدير المشروع المرشح؟ *
              </label>
              <select
                name="delivered"
                value={formData.delivered}
                onChange={handleChange}
                className="fs-sm fw-500 lh-1"
              >
                <option value="نعم">نعم</option>
                <option value="لا">لا</option>
              </select>
              {errors.delivered && (
                <div className="error">{errors.delivered}</div>
              )}
            </div>

            <div className="form-group">
              <label className="fs-md fw-600 lh-1-2">تاريخ تسليم المشروع لمدير المشروع المرشح *</label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="fs-sm fw-500 lh-1"
              />
              {errors.deliveryDate && (
                <div className="error">{errors.deliveryDate}</div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="button" className="cancel-button fs-md fw-600 lh-1" onClick={onClose}>
              إلغاء
            </button>
            <button type="submit" className="save-button fs-md fw-600 lh-1">
              حفظ
            </button>
          </div>
        </form>
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
    fontSize: "1rem",
    padding: "8px 12px",
  }}
/>

    </div>
  );
};

export default ProjectManagerForm;
