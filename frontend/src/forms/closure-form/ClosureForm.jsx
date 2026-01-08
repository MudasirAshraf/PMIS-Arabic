import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./closureform.scss";

const ProjectClosureForm = ({ goToNextTab }) => {
  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    contractorOrSupplier: "",
    projectBudget: "",
    governorate: "",
    projectManager: "",
    projectOwner: "",
    sponsor: "",
    durationDays: "",
    reasonsForClosure: "",
    performanceAgainstTime: "",
    performanceAgainstBudget: "",
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
    if (!formData.contractorOrSupplier)
      newErrors.contractorOrSupplier = "مطلوب";
    if (!formData.projectBudget) newErrors.projectBudget = "مطلوب";
    if (!formData.governorate) newErrors.governorate = "مطلوب";
    if (!formData.projectManager) newErrors.projectManager = "مطلوب";
    if (!formData.projectOwner) newErrors.projectOwner = "مطلوب";
    if (!formData.sponsor) newErrors.sponsor = "مطلوب";
    if (!formData.durationDays) newErrors.durationDays = "مطلوب";
    if (!formData.reasonsForClosure) newErrors.reasonsForClosure = "مطلوب";
    if (!formData.performanceAgainstTime) newErrors.performanceAgainstTime = "مطلوب";
    if (!formData.performanceAgainstBudget) newErrors.performanceAgainstBudget ="مطلوب";
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
    <form className="project-charter-form" onSubmit={handleSubmit}>
      {/* Row 1 */}
      <div className="prjct-chrt-info-row">
        <div className="prjct-chrt-project-code">
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            رمز المشروع *
          </label>
          <input
            name="projectCode"
            type="text"
            value={formData.projectCode}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.projectCode && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.projectCode}
            </span>
          )}
        </div>
        <div className="prjct-chrt-project-name">
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            اسم المشروع *
          </label>
          <input
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.projectName && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.projectName}
            </span>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="prjct-chrt-details-row">
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            المقاول أو المورد *
          </label>
          <input
            name="contractorOrSupplier"
            type="text"
            value={formData.contractorOrSupplier}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.contractorOrSupplier && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.contractorOrSupplier}
            </span>
          )}
        </div>
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            ميزانية المشروع *
          </label>
          <input
            name="projectBudget"
            type="number"
            value={formData.projectBudget}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.projectBudget && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.projectBudget}
            </span>
          )}
        </div>
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            المحافظة *
          </label>
          <input
            name="governorate"
            type="text"
            value={formData.governorate}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.governorate && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.governorate}
            </span>
          )}
        </div>
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            مدير المشروع *
          </label>
          <input
            name="projectManager"
            type="text"
            value={formData.projectManager}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.projectManager && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.projectManager}
            </span>
          )}
        </div>
      </div>

      {/* Row 3 */}
      <div className="prjct-chrt-details-row">
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            مالك المشروع *
          </label>
          <input
            name="projectOwner"
            type="text"
            value={formData.projectOwner}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.projectOwner && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.projectOwner}
            </span>
          )}
        </div>
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            راعي المشروع *
          </label>
          <input
            name="sponsor"
            type="text"
            value={formData.sponsor}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.sponsor && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.sponsor}
            </span>
          )}
        </div>
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            مدة المشروع (الأيام) *
          </label>
          <input
            name="durationDays"
            type="number"
            value={formData.durationDays}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.durationDays && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.durationDays}
            </span>
          )}
        </div>
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            أسباب إغلاق أنشطة المشروع *
          </label>
          <input
            name="reasonsForClosure"
            type="text"
            value={formData.reasonsForClosure}
            onChange={handleChange}
            className="prjct-chrt-input fs-md fw-500 lh-1-2"
          />
          {errors.reasonsForClosure && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.reasonsForClosure}
            </span>
          )}
        </div>
      </div>

      {/* Row 4 */}
      <div className="prjct-chrt-textarea-row">
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            أداء الجدول الزمني
          </label>
          <textarea
            name="performanceAgainstTime"
            rows="3"
            value={formData.performanceAgainstTime}
            onChange={handleChange}
            className="prjct-chrt-textarea fs-md fw-500 lh-1-2"
          />
            {errors.performanceAgainstTime && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.performanceAgainstTime}
            </span>
          )}
        </div>
      </div>

      {/* Row 5 */}
      <div className="prjct-chrt-textarea-row">
        <div>
          <label className="prjct-chrt-label fs-md fw-700 lh-1-2">
            أداء الميزانية
          </label>
          <textarea
            name="performanceAgainstBudget"
            rows="3"
            value={formData.performanceAgainstBudget}
            onChange={handleChange}
            className="prjct-chrt-textarea fs-md fw-500 lh-1-2"
          />
            {errors.performanceAgainstBudget && (
            <span className="prjct-chrt-error-message fs-sm fw-700 lh-1">
              {errors.performanceAgainstBudget}
            </span>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="prjct-chrt-submit-row">
        <button
          type="submit"
          className="btn-project-charter fs-md fw-600 lh-1-2"
        >
          حفظ
        </button>
      </div>

      {/* Toast Container */}
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

export default ProjectClosureForm;
