import React, { useState, useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../ThemeContext";

const IssueModal = ({ isOpen, onClose, issueData, onSave }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(issueData || {});
  const [errors, setErrors] = useState({});

  const fieldLabels = {
    IssueCode: "رمز المشكلة",
    IssueTitle: "عنوان المشكلة",
    IssueOwner: "مالك المشكلة",
    ExpectedEndDate: "تاريخ الانتهاء المتوقع",
    IssueDescription: "وصف المشكلة",
    IssueHandlingPlan: "خطة التعامل مع المشكلة",
    Status: "الحالة",
    IssueResult: "نتيجة المشكلة",
  };

  const requiredFields = [
    "IssueCode",
    "IssueTitle",
    "IssueOwner",
    "ExpectedEndDate",
    "Status",
    "IssueDescription",
    "IssueHandlingPlan",
    "IssueResult",
  ];

  useEffect(() => {
    const initializedData = { index: issueData?.index };
    Object.keys(fieldLabels).forEach((key) => {
      initializedData[key] = issueData?.[key] || "";
    });
    setFormData(initializedData);
    setErrors({});
  }, [issueData]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "مطلوب";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
      toast.success("تم الحفظ بنجاح!");
      setTimeout(() => {
        onClose();
      }, 100);
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  return (
    <div className="edit-risk-modal-overlay">
      <div className="edit-risk-modal-content">
        <div className="edit-risk-modal-header">
          <div className="second-header-risk-modal">
            <GrAppsRounded
              size={20}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p className="fs-md fw-600 lh-1-2">تعديل المشكلة</p>
          </div>
          <button className="risk-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="edit-risk-modal-body">
          {Object.keys(fieldLabels).map((field, index) => (
            <div key={index} className="labels-div">
              <label className="fs-md fw-700 lh-1-2">
                {fieldLabels[field]}
              </label>
              {["IssueDescription", "IssueHandlingPlan"].includes(field) ? (
                <textarea
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field === "ExpectedEndDate" ? "date" : "text"}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              )}
              {errors[field] && (
                <span className="error fs-sm fw-700 lh-1">{errors[field]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="edit-risk-modal-footer">
          <button
            className="cancel-button fs-lg fw-600 lh-1-2"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="save-button fs-lg fw-600 lh-1-2"
            onClick={handleSubmit}
          >
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
      </div>
    </div>
  );
};

export default IssueModal;
