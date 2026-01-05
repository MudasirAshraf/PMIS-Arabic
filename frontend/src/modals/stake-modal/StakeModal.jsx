import React, { useState, useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import { useTheme } from "../../ThemeContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StakeModal = ({ isOpen, onClose, stakeData, onSave }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(stakeData || {});
  const [errors, setErrors] = useState({});

  const fieldLabels = {
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    interestLevel: "درجة الاهتمام",
    impactLevel: "درجة التأثير",
    evaluation: "التقييم",
    responsibilities: "المسؤوليات",
    status: "الحالة",
  };

  const requiredFields = [
    "name",
    "email",
    "phone",
    "interestLevel",
    "impactLevel",
    "evaluation",
    "responsibilities",
    "status",
  ];

  useEffect(() => {
    const initializedData = { index: stakeData?.index };
    Object.keys(fieldLabels).forEach((key) => {
      initializedData[key] = stakeData?.[key] || "";
    });
    setFormData(initializedData);
    setErrors({});
  }, [stakeData]);

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
            <p>إضافة أصحاب المصلحة</p>
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
              {["responsibilities"].includes(field) ? (
                <textarea
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
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

export default StakeModal;
