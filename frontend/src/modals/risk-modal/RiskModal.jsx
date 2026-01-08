import React, { useState, useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../ThemeContext";


const RiskModal = ({ isOpen, onClose, riskData, onSave }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(riskData || {});
  const [errors, setErrors] = useState({});

  const fieldLabels = {
    code: "الرمز",
    title: "عنوان",
    description: "الوصف",
    plan: "الخطة",
    endDate: "تاريخ الانتهاء",
    owner: "المالك",
    status: "الحالة",
    result: "النتيجة",
    importance: "الأهمية",
    highlight: "التسليط الضوء",
    causeDescription: "وصف السبب",
  };

  const requiredFields = [
    "code",
    "title",
    "owner",
    "description",
    "status",
    "importance",
    "highlight",
    "result",
    "plan",
    "endDate",
    "causeDescription",
  ];

  useEffect(() => {
    const initializedData = { index: riskData?.index };
    Object.keys(fieldLabels).forEach((key) => {
      initializedData[key] = riskData?.[key] || "";
    });
    setFormData(initializedData);
    setErrors({});
  }, [riskData]);

  // Lock scroll when modal is open
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
      onClose();
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  return (
    <div className="layout-overlay">
      <div className="layout-container">
        <div className="layout-header">
          <div className="layout-header-actions">
            <GrAppsRounded
              size={20}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p className="fs-md fw-600 lh-1-2">تعديل الخطر</p>
          </div>
          <button className="layout-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="layout-grid">
          {Object.keys(fieldLabels).map((field, index) => (
            <div key={index} className="layout-field">
              <label className="fs-md fw-700 lh-1">{fieldLabels[field]}</label>
              {["description", "plan", "causeDescription"].includes(field) ? (
                <textarea
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field === "endDate" ? "date" : "text"}
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

        <div className="layout-footer">
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

export default RiskModal;
