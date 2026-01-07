import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./projectdetailsform.scss";

const ProjectDetailsForm = ({ goToNextTab }) => {
  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    budget: "",
    classification: "",
    sponsor: "",
    scope: "",
    bank: "",
    manager: "",
    owner: "",
    operationalGoals: "",
    strategicGoals: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectCode) newErrors.projectCode = "مطلوب";
    if (!formData.projectName) newErrors.projectName = "مطلوب";
    if (!formData.budget) newErrors.budget = "مطلوب";
    if (!formData.classification) newErrors.classification = "مطلوب";
    if (!formData.sponsor) newErrors.sponsor = "مطلوب";
    if (!formData.scope) newErrors.scope = "مطلوب";
    if (!formData.bank) newErrors.bank = "مطلوب";
    if (!formData.manager) newErrors.manager = "مطلوب";
    if (!formData.owner) newErrors.owner = "مطلوب";
    if (!formData.operationalGoals) newErrors.operationalGoals = "مطلوب";
    if (!formData.strategicGoals) newErrors.strategicGoals = "مطلوب";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      toast.success("تم حفظ البيانات بنجاح!");
      goToNextTab();
    } else {
      toast.error(
        "يرجى تعبئة التفاصيل ثم الضغط على حفظ للمتابعة إلى التبويب التالي"
      );
    }
  };

  return (
    <form className="project-details-form" onSubmit={handleSubmit}>
      <div className="row row-2">
        <div>
          <label className="fs-md fw-700 lh-1-2">رمز المشروع *</label>
          <input
            name="projectCode"
            type="text"
            value={formData.projectCode}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.projectCode && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.projectCode}
            </span>
          )}
        </div>
        <div>
          <label className="fs-md fw-700 lh-1-2">اسم المشروع *</label>
          <input
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.projectName && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.projectName}
            </span>
          )}
        </div>
      </div>

      <div className="row row-3">
        <div>
          <label className="fs-md fw-700 lh-1-2">ميزانية المشروع *</label>
          <input
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.budget && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.budget}
            </span>
          )}
        </div>
        <div>
          <label className="fs-md fw-700 lh-1-2">التصنيف *</label>
          <input
            name="classification"
            type="text"
            value={formData.classification}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.classification && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.classification}
            </span>
          )}
        </div>
        <div>
          <label className="fs-md fw-700 lh-1-2">بنك المبادرات والتوظيف</label>
          <input
            name="bank"
            type="text"
            value={formData.bank}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.bank && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.bank}
            </span>
          )}
        </div>
      </div>

      <div className="row row-3">
        <div>
          <label className="fs-md fw-700 lh-1-2">مدير المشروع</label>
          <input
            name="manager"
            type="text"
            value={formData.manager}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.manager && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.manager}
            </span>
          )}
        </div>
        <div>
          <label className="fs-md fw-700 lh-1-2">مالك المشروع</label>
          <input
            name="owner"
            type="text"
            value={formData.owner}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.owner && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.owner}
            </span>
          )}
        </div>
        <div>
          <label className="fs-md fw-700 lh-1-2">راعي المشروع *</label>
          <input
            name="sponsor"
            type="text"
            value={formData.sponsor}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.sponsor && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.sponsor}
            </span>
          )}
        </div>
      </div>

      <div className="row row-2">
        <div>
          <label className="fs-md fw-700 lh-1-2">الأهداف التشغيلية</label>
          <textarea
            name="operationalGoals"
            rows="3"
            value={formData.operationalGoals}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.operationalGoals && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.operationalGoals}
            </span>
          )}
        </div>
        <div>
          <label className="fs-md fw-700 lh-1-2">الأهداف الاستراتيجية</label>
          <textarea
            name="strategicGoals"
            rows="3"
            value={formData.strategicGoals}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.strategicGoals && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.strategicGoals}
            </span>
          )}
        </div>
      </div>

      <div className="row full-width">
        <div>
          <label className="fs-md fw-700 lh-1-2">نطاق المشروع *</label>
          <textarea
            name="scope"
            rows="3"
            value={formData.scope}
            onChange={handleChange}
            className="fs-md fw-500 lh-1-2"
          />
          {errors.scope && (
            <span className="error fs-md fw-600 lh-1-2 text-start">
              {errors.scope}
            </span>
          )}
        </div>
      </div>

      <div className="row-full-width">
        <button type="submit" className="fs-md fw-600 lh-1-2">
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
    </form>
  );
};

export default ProjectDetailsForm;
