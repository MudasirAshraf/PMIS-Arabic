import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./projectplanform.scss";


const ProjectPlanForm = ({ goToNextTab }) => {
  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    budget: "",
    sector: "",
    startDate: "",
    endDate: "",
    duration: "",
    scope: "",
    goals: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "مطلوب";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("تم حفظ البيانات بنجاح!");
      if (goToNextTab) goToNextTab();
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  return (
<form className="project-plan-form" onSubmit={handleSubmit}>
  <div className="row row-1">
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">رمز المشروع *</label>
      <input name="projectCode" type="text" value={formData.projectCode} onChange={handleChange} className="fs-m fw-500 lh-1" />
      {errors.projectCode && <span className="error">{errors.projectCode}</span>}
    </div>
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">اسم المشروع *</label>
      <input name="projectName" type="text" value={formData.projectName} onChange={handleChange} className="fs-m fw-500 lh-1" />
      {errors.projectName && <span className="error">{errors.projectName}</span>}
    </div>
  </div>
  <div className="row row-2">
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">المبلغ المعتمد في أمر الشراء *</label>
      <input name="budget" type="text" value={formData.budget} onChange={handleChange} className="fs-m fw-700 lh-1" />
      {errors.budget && <span className="error">{errors.budget}</span>}
    </div>
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">القطاع *</label>
      <input name="sector" type="text" value={formData.sector} onChange={handleChange} className="fs-m fw-500 lh-1" />
      {errors.sector && <span className="error">{errors.sector}</span>}
    </div>
  </div>
  <div className="row row-3">
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">تاريخ بداية المشروع *</label>
      <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="fs-m fw-500 lh-1" />
      {errors.startDate && <span className="error">{errors.startDate}</span>}
    </div>
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">تاريخ نهاية المشروع *</label>
      <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="fs-m fw-500 lh-1" />
      {errors.endDate && <span className="error">{errors.endDate}</span>}
    </div>
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">مدة المشروع (بالأيام) *</label>
      <input name="duration" type="number" value={formData.duration} onChange={handleChange} className="fs-m fw-500 lh-1" />
      {errors.duration && <span className="error">{errors.duration}</span>}
    </div>
  </div>
  <div className="row row-4">
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">نطاق عمل المشروع *</label>
      <textarea name="scope" rows="3" value={formData.scope} onChange={handleChange} className="fs-m fw-500 lh-1"></textarea>
      {errors.scope && <span className="error">{errors.scope}</span>}
    </div>
    <div className="field">
      <label className="fs-md fw-700 lh-1-2">أهداف المشروع *</label>
      <textarea name="goals" rows="3" value={formData.goals} onChange={handleChange} className="fs-m fw-500 lh-1-2"></textarea>
      {errors.goals && <span className="error">{errors.goals}</span>}
    </div>
  </div>

  {/* Submit Button */}
  <div className="container-submit-btn">
    <button type="submit" className="btn-project-plan fs-md fw-600 lh-1-2">حفظ</button>
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
      fontSize: "1rem",
      padding: "8px 12px",
    }}
  />
</form>
  );
};

export default ProjectPlanForm;