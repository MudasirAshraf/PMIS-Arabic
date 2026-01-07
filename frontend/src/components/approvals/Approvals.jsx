import React, { useState } from "react";
import SectionBlock from "../sectionblocks/SectionBlock";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./approvals.scss";

const Approvals = ({ goToNextTab, goToPreviousTab }) => {
  const [formData, setFormData] = useState({
    previousProjects: "",
    nextProjects: "",
  });

  const [errors, setErrors] = useState({
    previousProjects: "",
    nextProjects: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      previousProjects: !formData.previousProjects.trim()
        ? "مطلوب"
        : "",
      nextProjects: !formData.nextProjects.trim()
        ? "مطلوب"
        : "",
    };

    setErrors(newErrors);

    if (newErrors.previousProjects || newErrors.nextProjects) {
      toast.error("يرجى تعبئة الحقول المطلوبة قبل المتابعة");
      return;
    }

    toast.success("تم حفظ البيانات بنجاح!");
    goToNextTab();
  };

  return (
    <div className="main-container-approvals">
      {/* First-Block */}
      <SectionBlock title="المشاريع السابقة *">
        <textarea
          name="previousProjects"
          className="tab-textarea fs-md fw-600 lh-1-2"
          placeholder="المشاريع السابقة......"
          value={formData.previousProjects}
          onChange={handleChange}
        />
        {errors.previousProjects && (
          <span className="error fs-md fw-600 lh-1-2 text-start">
            {errors.previousProjects}
          </span>
        )}
      </SectionBlock>

      {/* Second-Block */}
      <SectionBlock title="المشاريع اللاحقة *">
        <textarea
          name="nextProjects"
          className="tab-textarea fs-md fw-600 lh-1-2"
          placeholder="المشاريع اللاحقة......"
          value={formData.nextProjects}
          onChange={handleChange}
        />
        {errors.nextProjects && (
          <span className="error fs-md fw-600 lh-1-2 text-start">
            {errors.nextProjects}
          </span>
        )}
      </SectionBlock>

      {/* Buttons */}
      <div className="shuffle-btns-container">
        {goToPreviousTab && (
          <button className="prev fs-md fw-600 lh-1-2" onClick={goToPreviousTab}>
            السابق
          </button>
        )}
        {goToNextTab && (
          <button className="next fs-md fw-600 lh-1-2" onClick={handleSubmit}>
            التالي
          </button>
        )}
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
    </div>
  );
};

export default Approvals;
