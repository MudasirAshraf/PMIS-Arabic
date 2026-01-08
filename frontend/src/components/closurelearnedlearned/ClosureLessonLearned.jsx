import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { PiSquaresFour } from "react-icons/pi";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./closurelesson.scss";

const ClosureLessonLearned = ({ goToPreviousTab, goToNextTab }) => {
  const [lessons, setLessons] = useState([]);
  const [showLessonModal, setShowLessonModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    date: "",
    happen: "",
    suggestions: "",
    situation: "",
    field: "",
    improvement: "",
  });
  const [errors, setErrors] = useState({});

  const toggleModal = () => setShowLessonModal(!showLessonModal);

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

  const validate = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        newErrors[key] = "مطلوب";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLessons([...lessons, form]);
    setForm({
      name: "",
      happen: "",
      suggestions: "",
      date: "",
      situation: "",
      field: "",
      improvement: "",
    });
    setShowLessonModal(false);
  };

  useEffect(() => {
    if (showLessonModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showLessonModal]);
  return (
    <div>
      {/* Header */}
      <div className="closure-header-container">
        <div className="closure-header-action" onClick={toggleModal}>
          <IoMdAdd className="closure-icon" />
          <p className="fs-md fw-700 lh-1-2">إضافة الدرس</p>
        </div>
      </div>
      {/* Lesson-Learned-Table */}
      <div className="closure-table-container">
        <table className="closure-table">
          <thead className="fs-md lh-1-2 fw-700">
            <tr>
              <th>الاسم</th>
              <th>ما الذي حصل؟</th>
              <th>الدروس المستفادة / الاقتراحات</th>
              <th>التاريخ</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1">
            {lessons.length > 0 ? (
              lessons.map((lesson, idx) => {
                const { name, happen, suggestions, date } = lesson;
                return (
                  <tr key={idx}>
                    <td>{name}</td>
                    <td>{happen}</td>
                    <td>{suggestions}</td>
                    <td>{date}</td>
                  </tr>
                );
              })
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
      {showLessonModal && (
        <div className="closure-modal-overlay">
          <div className="closure-modal">
            <div className="closure-modal-header">
              <div className="closure-modal-header-left">
                <PiSquaresFour className="closure-icon" />
                <h3>إضافة الدروس المستفادة</h3>
              </div>
              <button className="closure-modal-close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="closure-modal-body">
              <div className="closure-grd-I">
                <label className="fs-md fw-700 lh-1-2">
                  الاسم <span>*</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم"
                    value={form.name}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.name && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.name}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  ما الذي حصل<span>*</span>
                  <input
                    type="text"
                    name="happen"
                    placeholder="ما الذي حصل"
                    value={form.happen}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.happen && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.happen}
                    </span>
                  )}
                </label>
              </div>
              <div className="closure-grd-II">
                <label className="fs-md fw-700 lh-1-2">
                  الدروس المستفادة / الاقتراحات<span>*</span>
                  <textarea
                    name="suggestions"
                    placeholder="الدروس المستفادة / الاقتراحات"
                    value={form.suggestions}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.suggestions && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.suggestions}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  كيف تم التعامل مع الموقف؟<span>*</span>
                  <textarea
                    name="situation"
                    placeholder="كيف تم التعامل مع الموقف؟"
                    value={form.situation}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.situation && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.situation}
                    </span>
                  )}
                </label>
              </div>
              <div className="closure-grd-III">
                <label className="fs-md fw-700 lh-1-2">
                  المجال<span>*</span>
                  <textarea
                    name="field"
                    placeholder="الدروس المستفادة / الاقتراحات"
                    value={form.field}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.field && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.field}
                    </span>
                  )}
                </label>
                <label className="fs-md fw-700 lh-1-2">
                  أبرز النجاحات / مواطن التعديل<span>*</span>
                  <textarea
                    name="improvement"
                    placeholder="كيف تم التعامل مع الموقف؟"
                    value={form.improvement}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.improvement && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.improvement}
                    </span>
                  )}
                </label>
              </div>
              <div className="closure-grd-IV">
                <label className="fs-md fw-700 lh-1-2">
                  التاريخ<span>*</span>
                  <input
                    type="date"
                    name="date"
                    placeholder="التاريخ"
                    value={form.date}
                    onChange={handleChange}
                    className="fs-md fw-500 lh-1-2"
                  />
                  {errors.date && (
                    <span className="error fs-sm fw-700 lh-1">
                      {errors.date}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="closure-modal-footer">
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
          onClick={() => {
            toast.success("تم إرسال النموذج بنجاح");
            if (goToNextTab) {
              setTimeout(() => {
                goToNextTab();
              }, 1000);
            }
          }}
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

export default ClosureLessonLearned;
