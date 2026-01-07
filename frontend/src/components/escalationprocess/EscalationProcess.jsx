import React, { useState } from "react";
import SectionBlock from "../sectionblocks/SectionBlock";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EscalationProcess = ({ goToNextTab, goToPreviousTab }) => {
  const [escalationText, setEscalationText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEscalationText(e.target.value);
    if (e.target.value.trim()) setError("");
  };

  const handleSubmit = () => {
    if (!escalationText.trim()) {
      setError("مطلوب");
      toast.error("يرجى تعبئة عملية التصعيد قبل المتابعة");
      return;
    }

    toast.success("تم حفظ البيانات بنجاح!");
    goToNextTab();
  };

  return (
    <div>
      {/* Section-Block */}
      <SectionBlock title="عملية التصعيد *">
        <textarea
          name="escalationText"
          className="tab-textarea fs-md fw-600 lh-1-2"
          placeholder="عملية التصعيد ......"
          value={escalationText}
          onChange={handleChange}
        />
        {error && (
          <span className="error fs-md fw-600 lh-1-2 text-start">
            {error}
          </span>
        )}
      </SectionBlock>

      {/* Shuffle-Buttons */}
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

export default EscalationProcess;
