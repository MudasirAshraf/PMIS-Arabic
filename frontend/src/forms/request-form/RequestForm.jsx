import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./requestform.scss";

const RequestForm = ({ goToNextTab }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    contractor: "",
    owningDept: "",
    projectDuration: "",
    initiativeCenter: "",
    sponsor: "",
    projectManager: "",
    projectOwner: "",
    executorName: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = [
      "projectName",
      "projectCode",
      "contractor",
      "owningDept",
      "projectDuration",
      "initiativeCenter",
      "sponsor",
      "projectManager",
      "projectOwner",
      "executorName",
      "startDate",
      "endDate",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "مطلوب";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("تم حفظ البيانات بنجاح!");
      goToNextTab();
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  return (
    <div>
      <form className="change-request-form" onSubmit={handleSubmit}>
        <div className="change-request-row change-request-row-1">
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
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.projectName}</span>
            )}
          </div>
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
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.projectCode}</span>
            )}
          </div>
        </div>
        <div className="change-request-row change-request-row-2">
          <div>
            <label className="fs-md fw-700 lh-1-2 fs-sm fw-700 lh-1">المقاول أو المورد *</label>
            <input
              name="contractor"
              type="text"
              value={formData.contractor}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.contractor && (
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.contractor}</span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">الإدارة المالكة *</label>
            <input
              name="owningDept"
              type="text"
              value={formData.owningDept}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.owningDept && (
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.owningDept}</span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">مدة المشروع (بالأيام) *</label>
            <input
              name="projectDuration"
              type="number"
              value={formData.projectDuration}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.projectDuration && (
              <span className="change-request-error fs-sm fw-700 lh-1">
                {errors.projectDuration}
              </span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">مركز ريادة</label>
            <input
              name="initiativeCenter"
              type="text"
              value={formData.initiativeCenter}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
               {errors.initiativeCenter && (
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.initiativeCenter}</span>
            )}
          </div>
        </div>
        <div className="change-request-row change-request-row-3">
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
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.sponsor}</span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">مدير المشروع *</label>
            <input
              name="projectManager"
              type="text"
              value={formData.projectManager}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.projectManager && (
              <span className="change-request-error fs-sm fw-700 lh-1">
                {errors.projectManager}
              </span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">مالك المشروع *</label>
            <input
              name="projectOwner"
              type="text"
              value={formData.projectOwner}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.projectOwner && (
              <span className="change-request-error fs-sm fw-700 lh-1">
                {errors.projectOwner}
              </span>
            )}
          </div>
        </div>
        <div className="change-request-row change-request-row-4">
          <div>
            <label className="fs-md fw-700 lh-1-2">اسم المنفذ *</label>
            <input
              name="executorName"
              type="text"
              value={formData.executorName}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.executorName && (
              <span className="change-request-error fs-sm fw-700 lh-1">
                {errors.executorName}
              </span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">تاريخ بداية المشروع *</label>
            <input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.startDate && (
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.startDate}</span>
            )}
          </div>
          <div>
            <label className="fs-md fw-700 lh-1-2">تاريخ نهاية المشروع *</label>
            <input
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.endDate && (
              <span className="change-request-error fs-sm fw-700 lh-1">{errors.endDate}</span>
            )}
          </div>
        </div>
        <div className="change-request-row-full">
          <button type="submit" className="save-button fs-md fw-600 lh-1-2">
            حفظ
          </button>
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
            fontSize: "14px",
            padding: "8px 12px",
          }}
        />
      </form>
    </div>
  );
};

export default RequestForm;
