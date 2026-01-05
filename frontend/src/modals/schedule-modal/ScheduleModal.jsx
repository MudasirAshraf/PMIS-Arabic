import React, { useState, useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import { useTheme } from "../../ThemeContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./schedulemodal.scss";

const ScheduleModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const { theme } = useTheme();

  const formatDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string" || !dateStr.includes("/"))
      return "";
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    cost: "",
    comments: "",
    isBranch: false,
    isDependent: false,
    dependsOnTask: "",
    approvalType: "FS",
    isProjectTask: false,
    planned: "",
    actual: "",
    available: "",
    status: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || Date.now(),
        title: initialData.title || "",
        startDate: formatDate(initialData.startDate) || "",
        endDate: formatDate(initialData.endDate) || "",
        cost: initialData.cost || "",
        comments: initialData.comments || "",
        isBranch: initialData.isBranch || false,
        isDependent: initialData.isDependent || false,
        dependsOnTask: initialData.dependsOnTask || "",
        approvalType: initialData.approvalType || "FS",
        isProjectTask: initialData.isProjectTask || false,
        planned: initialData.planned || "",
        actual: initialData.actual || "",
        available: initialData.available || "",
        status: initialData.status || "",
      });
      setErrors({});
    } else if (isOpen) {
      setFormData({
        id: Date.now(),
        title: "",
        startDate: "",
        endDate: "",
        cost: "",
        comments: "",
        isBranch: false,
        isDependent: false,
        dependsOnTask: "",
        approvalType: "FS",
        isProjectTask: false,
        planned: "",
        actual: "",
        available: "",
        status: "",
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const [errors, setErrors] = useState({});

  const requiredFields = [
    "title",
    "startDate",
    "endDate",
    "cost",
    "planned",
    "actual",
    "available",
    "status",
  ];

  // Handle-Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name] && value.trim() !== "") {
      setErrors((prevErrors) => {
        const updated = { ...prevErrors };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSelectChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      id: prev.id,
      [field]: e.target.value === "yes",
    }));
  };

  // Validate
  const validate = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (
        formData[field] === undefined ||
        formData[field] === null ||
        formData[field].toString().trim() === ""
      ) {
        newErrors[field] = "مطلوب";
      }
    });

    if (formData.isDependent) {
      if (!formData.dependsOnTask || formData.dependsOnTask.trim() === "") {
        newErrors.dependsOnTask = "مطلوب";
      }

      if (!formData.approvalType || formData.approvalType.trim() === "") {
        newErrors.approvalType = "مطلوب";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const dataToSave = {
        ...formData,
        id: formData.id || Date.now(),
      };

      onSave(dataToSave);
      toast.success("تم الحفظ بنجاح!");
      onClose();
    } else {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal-box">
        <div className="schedule-modal-header">
          <div className="second-header-schedule-modal">
            <GrAppsRounded
              size={20}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p className="fs-md fw-600 lh-1-2">إضافة المهمة</p>
          </div>
          <button className="schedule-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="schedule-modal-grid">
          <div className="grid-2">
            <div>
              <label className="fs-md fw-700 lh-1-2">عنوان المهمة *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <span className="error fs-sm fw-700 lh-1">{errors.title}</span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">التكلفة *</label>
              <input
                name="cost"
                value={formData.cost}
                onChange={handleChange}
              />
              {errors.cost && (
                <span className="error fs-sm fw-700 lh-1">{errors.cost}</span>
              )}
            </div>
          </div>
          <div className="grid-2">
            <div>
              <label className="fs-md fw-700 lh-1-2">تاريخ البداية *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.startDate}
                </span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">تاريخ النهاية *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              {errors.endDate && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.endDate}
                </span>
              )}
            </div>
          </div>

          <div className="grid-4">
            <div>
              <label className="fs-md fw-700 lh-1-2">نسبة الخطة *</label>
              <input
                name="planned"
                value={formData.planned}
                onChange={handleChange}
              />
              {errors.planned && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.planned}
                </span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">النسبة الفعلية *</label>
              <input
                name="actual"
                value={formData.actual}
                onChange={handleChange}
              />
              {errors.actual && (
                <span className="error fs-sm fw-700 lh-1">{errors.actual}</span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">المتوفر *</label>
              <input
                name="available"
                value={formData.available}
                onChange={handleChange}
              />
              {errors.available && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.available}
                </span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">الحالة *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">اختر الحالة</option>
                <option value="مفتوح">مفتوح</option>
                <option value="مغلق">مغلق</option>
                <option value="متأخر جدا">متأخر جدا</option>
              </select>
              {errors.status && (
                <span className="error fs-sm fw-700 lh-1">{errors.status}</span>
              )}
            </div>
          </div>
          <div className="grid-full">
            <label className="fs-md fw-700 lh-1-2">التعليقات</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
            {errors.comments && (
              <span className="error fs-sm fw-700 lh-1">{errors.comments}</span>
            )}
          </div>
          <div className="grid-2">
            <div>
              <label className="fs-md fw-700 lh-1-2">هل المهمة فرعية؟</label>
              <select
                name="isBranch"
                value={formData.isBranch ? "yes" : "no"}
                onChange={(e) => handleSelectChange(e, "isBranch")}
              >
                <option value="no">لا</option>
                <option value="yes">نعم</option>
              </select>
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">
                هل المهمة معتمدة على مهمة أخرى؟
              </label>
              <select
                name="isDependent"
                value={formData.isDependent ? "yes" : "no"}
                onChange={(e) => handleSelectChange(e, "isDependent")}
              >
                <option value="no">لا</option>
                <option value="yes">نعم</option>
              </select>
            </div>
          </div>
          <div className="grid-3">
            <div>
              <label className="fs-md fw-700 lh-1-2">
                اختر المهمة المعتمدة عليها
              </label>
              <input
                name="dependsOnTask"
                value={formData.dependsOnTask}
                onChange={handleChange}
              />
              {errors.dependsOnTask && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.dependsOnTask}
                </span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">نوع الإعتمادية</label>
              <input
                name="approvalType"
                value={formData.approvalType}
                onChange={handleChange}
              />
              {errors.approvalType && (
                <span className="error fs-sm fw-700 lh-1">
                  {errors.approvalType}
                </span>
              )}
            </div>
            <div>
              <label className="fs-md fw-700 lh-1-2">هل المهمة للمشروع؟</label>
              <select
                name="isProjectTask"
                value={formData.isProjectTask ? "yes" : "no"}
                onChange={(e) => handleSelectChange(e, "isProjectTask")}
              >
                <option value="no">لا</option>
                <option value="yes">نعم</option>
              </select>
            </div>
          </div>
        </div>
        <div className="schedule-modal-actions">
          <button
            onClick={onClose}
            className="cancel-button fs-lg fw-600 lh-1-2"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="save-button fs-lg fw-600 lh-1-2"
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

export default ScheduleModal;
