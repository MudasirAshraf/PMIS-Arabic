import React, { useState, useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import { useTheme } from "../../ThemeContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LessonModal = ({ isOpen, onClose, lessonData, onSave }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(lessonData || {});
  const [errors, setErrors] = useState({});

  const fieldLabels = {
    title: "العنوان",
    whatHappened: "ما الذي حصل",
    handling: "كيف تم التعامل مع الموقف",
    lessonsLearned: "الدروس المستفادة",
    field: "المجال",
    challenges: "أبرز التحديات",
    date: "التاريخ",
  };

  const requiredFields = Object.keys(fieldLabels);

  useEffect(() => {
    const initializedData = { index: lessonData?.index };
    Object.keys(fieldLabels).forEach((key) => {
      initializedData[key] = lessonData?.[key] || "";
    });
    setFormData(initializedData);
    setErrors({});
  }, [lessonData]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
      toast.success("تم الحفظ بنجاح!");
      setTimeout(onClose, 100); // slight delay to ensure toast appears
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
            <p className="fs-md fw-600 lh-1-2">إضافة درس مستفاد</p>
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
              {["handling", "lessonsLearned", "challenges"].includes(field) ? (
                <textarea
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field === "date" ? "date" : "text"}
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
            zIndex: 9999,
          }}
        />
      </div>
    </div>
  );
};

export default LessonModal;
