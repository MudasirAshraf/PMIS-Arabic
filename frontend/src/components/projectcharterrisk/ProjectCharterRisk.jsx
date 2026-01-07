import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./projectchartrisk.scss";

const ProjectCharterRisks = ({ goToNextTab, goToPreviousTab }) => {
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [risks, setRisks] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    description: "",
    mitigation: "",
    impact: "",
    probability: "",
  });

  const toggleModal = () => setShowRiskModal(!showRiskModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updated = { ...prevErrors };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = "مطلوب";
    if (!form.mitigation.trim()) newErrors.mitigation = "مطلوب";
    if (!form.impact.trim()) newErrors.impact = "مطلوب";
    if (!form.probability.trim()) newErrors.probability = "مطلوب";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setRisks([...risks, form]);
    setForm({ description: "", mitigation: "", impact: "", probability: "" });
    setErrors({});
    setShowRiskModal(false);
    toast.success("تمت إضافة الخطر بنجاح");
  };

  useEffect(() => {
    if (showRiskModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showRiskModal]);

  return (
    <div>
      {/* Header */}
      <div className="container-header-risk">
        <div className="header-project-risk" onClick={toggleModal}>
          <IoMdAdd className="project-icon" />
          <p className="fs-md fw-700 lh-1-2">إضافة الخطر</p>
        </div>
      </div>

      {/* Risk Table */}
      <div className="risk-panel-table-container">
        <table className="risk-panel-table">
          <thead className="fs-md lh-1-2 fw-700">
            <tr>
              <th>وصف الخطر</th>
              <th>تأثير الخطر</th>
              <th>احتمالية حدوث الخطر</th>
              <th>تخفيف الخطر</th>
            </tr>
          </thead>
          <tbody className="fs-m lh-1-2 fw-500">
            {risks.length > 0 ? (
              risks.map((risk, idx) => (
                <tr key={idx}>
                  <td>{risk.description}</td>
                  <td>{risk.impact}</td>
                  <td>{risk.probability}</td>
                  <td>{risk.mitigation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "start" }}>
                  لا يوجد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showRiskModal && (
        <div className="addrisk-modal-overlay">
          <div className="addrisk-modal">
            <div className="addrisk-modal-header">
              <div className="sub-addrisk-modal-header">
                <PiSquaresFour className="project-icon" />
                <h3>إضافة الخطر</h3>
              </div>
              <button className="addrisk-close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="addrisk-modal-body">
              <label className="fs-md fw-700 lh-1-2">
                وصف الخطر <span>*</span>
                <textarea
                  name="description"
                  placeholder="وصف الخطر"
                  value={form.description}
                  onChange={handleChange}
                  className="fs-m fw-500 lh-1-2"
                />
                {errors.description && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.description}
                  </span>
                )}
              </label>
              <label className="fs-md fw-700 lh-1-2">
                تخفيف الخطر <span>*</span>
                <textarea
                  name="mitigation"
                  placeholder="تخفيف الخطر"
                  value={form.mitigation}
                  onChange={handleChange}
                  className="fs-m fw-500 lh-1-2"
                />
                {errors.mitigation && (
                  <span className="error fs-sm fw-700 lh-1">
                    {errors.mitigation}
                  </span>
                )}
              </label>
              <div className="addrisk-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  تأثير الخطر <span>*</span>
                  <input
                    name="impact"
                    type="number"
                    min="1"
                    value={form.impact}
                    onChange={handleChange}
                    className="fs-m fw-500 lh-1-2"
                  />
                  {errors.impact && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.impact}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  احتمالية حدوث الخطر <span>*</span>
                  <input
                    name="probability"
                    type="number"
                    min="1"
                    value={form.probability}
                    onChange={handleChange}
                    className="fs-m fw-500 lh-1-2"
                  />
                  {errors.probability && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.probability}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="addrisk-modal-footer">
              <button
                className="cancel-button fs-md fw-600 lh-1-2"
                onClick={toggleModal}
              >
                إلغاء
              </button>
              <button
                className="save-button fs-md fw-600 lh-1-2"
                onClick={handleSave}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="shuffle-btns-cotainer">
        {goToPreviousTab && (
          <button
            className="prev fs-md fw-600 lh-1-2"
            onClick={goToPreviousTab}
          >
            السابق
          </button>
        )}
        {goToNextTab && (
          <button className="next fs-md fw-600 lh-1-2" onClick={goToNextTab}>
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

export default ProjectCharterRisks;
