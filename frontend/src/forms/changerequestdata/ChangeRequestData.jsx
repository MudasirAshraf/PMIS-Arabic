import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import "./changerequestdata.scss";

const ChangeRequestData = ({ goToPreviousTab, goToNextTab }) => {
  const [formData, setFormData] = useState({
    changeNumber: "",
    changeTitle: "",
    changeDescription: "",
    changeJustification: "",
    typeofChange: [],
    changeClassification: "",
    trackType: "",
    impactServices: "",
    impactQuantities: "",
    newStartDate: "",
    newEndDate: "",
  });

  const [errors, setErrors] = useState({});

  const options = [
    { value: "الجدول الزمني", label: "الجدول الزمني" },
    { value: "النطاق", label: "النطاق" },
    { value: "التكلفة", label: "التكلفة" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = [
      "changeNumber",
      "changeTitle",
      "changeDescription",
      "changeJustification",
      "typeofChange",
      "changeClassification",
      "trackType",
      "impactServices",
      "impactQuantities",
      "newStartDate",
      "newEndDate",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (field === "typeofChange") {
        if (formData.typeofChange.length === 0) {
          newErrors[field] = "مطلوب";
        }
      } else if (!formData[field]) {
        newErrors[field] = "مطلوب";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <form className="change-data">
        <div className="change-data-row row-1">
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">رمز التغيير</label>
            <input
              name="changeNumber"
              value={formData.changeNumber}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
             {errors.changeNumber && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.changeNumber}
              </span>
            )}
          </div>
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">عنوان التغيير</label>
            <input
              name="changeTitle"
              value={formData.changeTitle}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.changeTitle && (
              <span className="error fs-sm fw-700 lh-1">{errors.changeTitle}</span>
            )}
          </div>
        </div>

        <div className="change-data-row row-2">
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">وصف التغيير</label>
            <textarea
              name="changeDescription"
              value={formData.changeDescription}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.changeDescription && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.changeDescription}
              </span>
            )}
          </div>
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">مبررات التغيير المقترح</label>
            <textarea
              name="changeJustification"
              value={formData.changeJustification}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.changeJustification && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.changeJustification}
              </span>
            )}
          </div>
        </div>

        <div className="change-data-row row-3">
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">نوع التغيير</label>
            <Select
              isMulti
              name="typeofChange"
              options={options}
              className="basic-multi-select fs-md fw-600 lh-1-5"
              classNamePrefix="select fs-md fw-600 lh-1"
              value={options.filter((o) =>
                formData.typeofChange.includes(o.value)
              )}
              onChange={(selectedOptions) =>
                setFormData((prev) => ({
                  ...prev,
                  typeofChange: selectedOptions.map((opt) => opt.value),
                }))
              }
            />
            {errors.typeofChange && (
              <span className="error fs-sm fw-700 lh-1">{errors.typeofChange}</span>
            )}
          </div>
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">تصنيف التغيير</label>
            <input
              name="changeClassification"
              value={formData.changeClassification}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.changeClassification && (
              <span className="error fs-sm fw-700 lh-1">
                {errors.changeClassification}
              </span>
            )}
          </div>
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">نوع المسار</label>
            <input
              name="trackType"
              value={formData.trackType}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.trackType && (
              <span className="error fs-sm fw-700 lh-1">{errors.trackType}</span>
            )}
          </div>
        </div>

        <div className="change-data-row row-4">
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">
              صفة الأثر المتوقع على جدول الخدمات للمشروع
            </label>
            <textarea
              name="impactServices"
              value={formData.impactServices}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.impactServices && (
              <span className="error fs-sm fw-700 lh-1">{errors.impactServices}</span>
            )}
          </div>
        </div>

        <div className="change-data-row row-5">
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">
              صفة الأثر المتوقع من طلب التغيير على جدول الكميات للمشروع
            </label>
            <textarea
              name="impactQuantities"
              value={formData.impactQuantities}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.impactQuantities && (
              <span className="error fs-sm fw-700 lh-1">{errors.impactQuantities}</span>
            )}
          </div>
        </div>

        <div className="change-data-row row-6">
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">تاريخ البدء الجديد</label>
            <input
              type="date"
              name="newStartDate"
              value={formData.newStartDate}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.newStartDate && (
              <span className="error fs-sm fw-700 lh-1">{errors.newStartDate}</span>
            )}
          </div>
          <div className="change-data-field">
            <label className="fs-md fw-700 lh-1-2">تاريخ الانتهاء الجديد</label>
            <input
              type="date"
              name="newEndDate"
              value={formData.newEndDate}
              onChange={handleChange}
              className="fs-md fw-500 lh-1-2"
            />
            {errors.newEndDate && (
              <span className="error fs-sm fw-700 lh-1">{errors.newEndDate}</span>
            )}
          </div>
        </div>

        <div className="shuffle-btns-container">
          {goToPreviousTab && (
            <button className="prev fs-md fw-600 lh-1-2" onClick={goToPreviousTab}>
              السابق
            </button>
          )}
          {goToNextTab && (
            <button
              className="next fs-md fw-600 lh-1-2"
              onClick={(e) => {
                e.preventDefault();
                if (validate()) {
                  toast.success("تم حفظ البيانات بنجاح!");
                  goToNextTab();
                } else {
                  toast.error("يرجى تعبئة جميع الحقول قبل المتابعة");
                }
              }}
            >
              التالي
            </button>
          )}
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

export default ChangeRequestData;
