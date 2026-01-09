import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectPlanRisks = ({ goToNextTab, goToPreviousTab }) => {
  const [plans, setPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const [form, setForm] = useState({
    description: "",
    impact: "",
    likelihood: "",
    owner: "",
    mitigation: "",
  });
  const [errors, setErrors] = useState({});

  const toggleModal = () => setShowPlanModal(!showPlanModal);

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
    if (!form.impact.trim()) newErrors.impact = "مطلوب";
    if (!form.likelihood.trim()) newErrors.likelihood = "مطلوب";
    if (!form.owner.trim()) newErrors.owner = "مطلوب";
    if (!form.mitigation.trim()) newErrors.mitigation = "مطلوب";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setPlans([...plans, form]);
    setForm({
      description: "",
      impact: "",
      likelihood: "",
      owner: "",
      mitigation: "",
    });
    setErrors({});
    setShowPlanModal(false);
    toast.success("تمت إضافة الخطر بنجاح");
  };

  useEffect(() => {
    if (showPlanModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showPlanModal]);

  const renderCell = (value) => (
    <span
      className="cell-text"
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--tooltip-top",
          `${rect.top + rect.height}px`
        );
        e.currentTarget.style.setProperty("--tooltip-left", `${rect.left}px`);
      }}
      data-fulltext={value ?? "_"}
    >
      {value ?? "_"}
    </span>
  );

  return (
    <div>
      {/* Header */}
      <div className="ui-header-container">
        <div className="ui-header-action" onClick={toggleModal}>
          <IoMdAdd className="ui-icon-sm" />
          <p className="fs-md fw-700 lh-1-2">إضافة الخطر</p>
        </div>
      </div>

      {/* Risk Table */}
      <div className="uil-table-container">
        <table className="ui-table">
          <thead className="fs-md lh-1-2 fw-700">
            <tr>
              <th>وصف الخطر</th>
              <th>تأثير الخطر</th>
              <th>احتمالية حدوث الخطر</th>
              <th>المالك</th>
              <th>لتخفيف الخطر</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1">
            {plans.length > 0 ? (
              plans.map((plan, idx) => (
                <tr key={idx}>
                  <td>{renderCell(plan.description)}</td>
                  <td>{renderCell(plan.impact)}</td>
                  <td>{renderCell(plan.likelihood)}</td>
                  <td>{renderCell(plan.owner)}</td>
                  <td>{renderCell(plan.mitigation)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "start" }}>
                  لا يوجد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showPlanModal && (
        <div className="ui-modal-overlay">
          <div className="ui-modal">
            <div className="ui-modal-header">
              <div className="ui-modal-header-left">
                <PiSquaresFour className="ui-icon-sm" />
                <h3>إضافة الخطر</h3>
              </div>
              <button className="ui-modal-close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="ui-modal-body">
              <div className="ui-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  وصف الخطر <span>*</span>
                  <textarea
                    name="description"
                    placeholder="وصف الخطر"
                    value={form.description}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
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
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.mitigation && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.mitigation}
                    </span>
                  )}
                </label>
              </div>
              <div className="ui-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  تأثير الخطر <span>*</span>
                  <input
                    name="impact"
                    type="number"
                    min="1"
                    value={form.impact}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
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
                    name="likelihood"
                    type="number"
                    min="1"
                    value={form.likelihood}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.likelihood && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.likelihood}
                    </span>
                  )}
                </label>

                <label className="fs-md fw-700 lh-1-2">
                  المالك <span>*</span>
                  <input
                    name="owner"
                    type="text"
                    value={form.owner}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.owner && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.owner}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="ui-modal-footer">
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

      {/* Shuffle-Buttons */}
      <div className="shuffle-btns-container">
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

export default ProjectPlanRisks;
