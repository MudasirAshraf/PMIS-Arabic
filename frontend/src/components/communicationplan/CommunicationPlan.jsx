import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommunicationPlan = ({ goToNextTab, goToPreviousTab }) => {
  const [communications, setCommunications] = useState([]);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    typeofcontact: "",
    responsible: "",
    recipients: "",
    frequency: "",
    communicationmethod: "",
  });

  const toggleModal = () => setShowCommunicationModal(!showCommunicationModal);

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
    if (!form.typeofcontact.trim()) newErrors.typeofcontact = "مطلوب";
    if (!form.responsible.trim()) newErrors.responsible = "مطلوب";
    if (!form.recipients.trim()) newErrors.recipients = "مطلوب";
    if (!form.frequency.trim()) newErrors.frequency = "مطلوب";
    if (!form.communicationmethod.trim())
      newErrors.communicationmethod = "مطلوب";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setCommunications([...communications, form]);
    setForm({
      typeofcontact: "",
      responsible: "",
      recipients: "",
      frequency: "",
      communicationmethod: "",
    });
    setErrors({});
    setShowCommunicationModal(false);
    toast.success("تمت إضافة العنصر بنجاح");
  };

  useEffect(() => {
    if (showCommunicationModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showCommunicationModal]);
  return (
    <div>
      {/* Header */}
      <div className="ui-header-container">
        <div className="ui-header-action" onClick={toggleModal}>
          <IoMdAdd className="ui-icon-sm" />
          <p className="fs-md fw-700 lh-1-2">إضافة العنصر</p>
        </div>
      </div>
      {/* Communication-Table */}
      <div className="ui-table-container">
        <table className="ui-table">
          <thead className="fs-md lh-1-2 fw-700">
            <tr>
              <th>نوع الاتصال </th>
              <th>المسؤول</th>
              <th>التكرار</th>
              <th>المستلمين</th>
              <th>طريقة التواصل</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1">
            {communications.length > 0 ? (
              communications.map((communication, idx) => (
                <tr key={idx}>
                  <td>{communication.typeofcontact}</td>
                  <td>{communication.responsible}</td>
                  <td>{communication.frequency}</td>
                  <td>{communication.recipients}</td>
                  <td>{communication.communicationmethod}</td>
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
      {showCommunicationModal && (
        <div className="ui-modal-overlay">
          <div className="ui-modal">
            <div className="ui-modal-header">
              <div className="ui-modal-header-left">
                <PiSquaresFour className="ui-icon-sm" />
                <h3>إضافة العنصر</h3>
              </div>
              <button className="ui-modal-close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="ui-modal-body">
              <div className="ui-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  نوع الاتصال <span>*</span>
                  <input
                    type="text"
                    name="typeofcontact"
                    placeholder="نوع الاتصال "
                    value={form.typeofcontact}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.typeofcontact && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.typeofcontact}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  المسؤول<span>*</span>
                  <input
                    type="text"
                    name="responsible"
                    placeholder="المسؤول"
                    value={form.responsible}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.responsible && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.responsible}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  التكرار <span>*</span>
                  <input
                    name="frequency"
                    type="text"
                    value={form.frequency}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.frequency && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.frequency}
                    </span>
                  )}
                </label>
              </div>
              <div className="ui-modal-row">
                <label className="fs-md fw-700 lh-1-2">
                  المستلمين <span>*</span>
                  <textarea
                    name="recipients"
                    placeholder="نوع الاتصال "
                    value={form.recipients}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.recipients && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.recipients}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  طريقة التواصل <span>*</span>
                  <textarea
                    name="communicationmethod"
                    placeholder="المسؤول"
                    value={form.communicationmethod}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.communicationmethod && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.communicationmethod}
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

export default CommunicationPlan;
