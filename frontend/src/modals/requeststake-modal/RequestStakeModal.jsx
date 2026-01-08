import React, { useEffect, useState } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./requeststakemodal.scss";

const RequestStakeModal = ({
  isOpen,
  onClose,
  onSave,
  stakeholder,
  setStakeholder,
}) => {
  const [errors, setErrors] = useState({});

  const handleChange = (index, value) => {
    const updated = [...stakeholder];
    updated[index] = value;
    setStakeholder(updated);

    if (errors[index] && value.trim() !== "") {
      const updatedErrors = { ...errors };
      delete updatedErrors[index];
      setErrors(updatedErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!stakeholder[0]?.trim()) newErrors[0] = "مطلوب";
    if (!stakeholder[1]?.trim()) newErrors[1] = "مطلوب";
    if (!stakeholder[2]?.trim()) newErrors[2] = "مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave();
      setErrors({});
      toast.success("تم الحفظ بنجاح!");
      onClose();
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="request-stake-overlay">
      <div className="request-stake-content">
        <div className="request-stake-header">
          <div className="sub-header-request-stake">
            <PiSquaresFour className="request-icon" />
            <h3>إضافة صاحب العلاقة</h3>
          </div>
          <button onClick={onClose} className="request-stake-close-btn">×</button>
        </div>

        <div className="request-stake-body">
          <div className="request-stake-row">
            <div className="request-stake-field">
              <label className="fs-md fw-700 lh-1-2">
                الاسم <span className="request-stake-required">*</span>
              </label>
              <input
                type="text"
                placeholder="الاسم"
                value={stakeholder[0] || ""}
                onChange={(e) => handleChange(0, e.target.value)}
                className="fs-md fw-500 lh-1"
              />
              {errors[0] && <span className="error fs-sm fw-700 lh-1">{errors[0]}</span>}
            </div>
            <div className="request-stake-field">
              <label className="fs-md fw-700 lh-1-2">
                المسمى الوظيفي <span className="request-stake-required">*</span>
              </label>
              <input
                type="text"
                placeholder="المسمى الوظيفي"
                value={stakeholder[1] || ""}
                onChange={(e) => handleChange(1, e.target.value)}
                className="fs-md fw-500 lh-1"
              />
              {errors[1] && <span className="error fs-sm fw-700 lh-1">{errors[1]}</span>}
            </div>
          </div>

          <div className="request-stake-row">
            <div className="request-stake-field">
              <label className="fs-md fw-700 lh-1-2">النوع</label>
              <select
                value={stakeholder[3] || ""}
                onChange={(e) => handleChange(3, e.target.value)}
                className="fs-md fw-500 lh-1"
              >
                <option value="">اختر النوع</option>
                <option value="داخلي">داخلي</option>
                <option value="خارجي">خارجي</option>
              </select>
            </div>
            <div className="request-stake-field">
              <label className="fs-md fw-700 lh-1-2">
                الدور والمسؤوليات بالمشروع <span className="request-stake-required">*</span>
              </label>
              <textarea
                placeholder="الدور والمسؤوليات بالمشروع"
                value={stakeholder[2] || ""}
                onChange={(e) => handleChange(2, e.target.value)}
                rows={3}
                className="fs-md fw-500 lh-1"
              />
              {errors[2] && <span className="error fs-sm fw-700 lh-1">{errors[2]}</span>}
            </div>
          </div>
        </div>

        <div className="request-stake-footer">
          <button onClick={onClose} className="cancel-button fs-sm fw-700 lh-1">
            إلغاء
          </button>
          <button onClick={handleSubmit} className="save-button fs-sm fw-700 lh-1">
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
      </div>
    </div>
  );
};

export default RequestStakeModal;
