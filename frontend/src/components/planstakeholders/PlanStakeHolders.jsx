import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { PiSquaresFour } from "react-icons/pi";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlanStakeholders = ({ goToPreviousTab }) => {
  const [stakeholders, setStakeholders] = useState([]);
  const [showStakeholderModal, setShowStakeholderModal] = useState(false);

  const [form, setForm] = useState({
    stakeholdername: "",
    jobtitle: "",
    type: "",
    roleandresp: "",
  });

  const [errors, setErrors] = useState({});

  const toggleModal = () => setShowStakeholderModal(!showStakeholderModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!form.stakeholdername.trim()) newErrors.stakeholdername = "مطلوب";
    if (!form.jobtitle.trim()) newErrors.jobtitle = "مطلوب";
    if (!form.type.trim()) newErrors.type = "مطلوب";
    if (!form.roleandresp.trim()) newErrors.roleandresp = "مطلوب";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setStakeholders([...stakeholders, form]);
    setForm({
      stakeholdername: "",
      jobtitle: "",
      type: "",
      roleandresp: "",
    });
    setErrors({});
    setShowStakeholderModal(false);
    toast.success("تمت إضافة صاحب العلاقة بنجاح");
  };

  useEffect(() => {
    if (showStakeholderModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showStakeholderModal]);
  return (
    <div>
      {/* Header */}
      <div className="ui-header-container">
        <div className="ui-header-action" onClick={toggleModal}>
          <IoMdAdd className="ui-icon-sm" />
          <p className="fs-md fw-700 lh-1-2">إضافة صاحب العلاقة</p>
        </div>
      </div>

      {/* Stakeholders-Table */}
      <div className="ui-table-container">
        <table className="ui-table">
          <thead className="fs-md lh-1-2 fw-700">
            <tr>
              <th>اسم صاحب العلاقة</th>
              <th>المسمى الوظيفي </th>
              <th>النوع</th>
              <th>الدور والمسؤوليات بالمشروع</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1">
            {stakeholders.length > 0 ? (
              stakeholders.map((stakeholder, idx) => (
                <tr key={idx}>
                  <td>{stakeholder.stakeholdername}</td>
                  <td>{stakeholder.jobtitle}</td>
                  <td>{stakeholder.type}</td>
                  <td>{stakeholder.roleandresp}</td>
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
      {showStakeholderModal && (
        <div className="ui-modal-overlay">
          <div className="ui-modal">
            <div className="ui-modal-header">
              <div className="ui-modal-header-left">
                <PiSquaresFour className="ui-icon-sm" />
                <h3>إضافة صاحب العلاقة</h3>
              </div>
              <button className="ui-modal-close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="ui-modal-body">
              <div className="ui-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  اسم <span>*</span>
                  <input
                    type="text"
                    name="stakeholdername"
                    placeholder="اسم"
                    value={form.stakeholdername}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.stakeholdername && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.stakeholdername}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  المسؤول<span>*</span>
                  <input
                    type="text"
                    name="jobtitle"
                    placeholder="المسمى الوظيفي"
                    value={form.jobtitle}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.jobtitle && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.jobtitle}
                    </span>
                  )}
                </label>
              </div>
              <div className="ui-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  النوع <span>*</span>
                  <input
                    type="text"
                    name="type"
                    placeholder="النوع"
                    value={form.type}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.type && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.type}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  الدور والمسؤوليات بالمشروع<span>*</span>
                  <textarea
                    name="roleandresp"
                    placeholder="الدور والمسؤوليات بالمشروع"
                    value={form.roleandresp}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.roleandresp && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.roleandresp}
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
        <button
          className="submit-stack-button fs-md fw-600 lh-1-2"
          onClick={() => toast.success("تم إرسال النموذج بنجاح")}
        >
          إرسال
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
          fontSize: "1rem",
          padding: "8px 12px",
        }}
      />
    </div>
  );
};

export default PlanStakeholders;
