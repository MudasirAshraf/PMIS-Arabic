import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./competitiondetails.scss";

const CompetitionDetailsII = ({
  data,
  onChange,
  showAddAnother,
  onAddAnother,
  maxBudget,
}) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange && onChange(field, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleChange("attachment", file ? file.name : "");
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      textAlign: "start",
      color: "black",
      borderColor: "#ccc",
      boxShadow: "none",
      "&:hover": { borderColor: "#007bff" },
    }),
    singleValue: (base) => ({
      ...base,
      color: "black",
      textAlign: "start",
    }),
    option: (base, state) => ({
      ...base,
      textAlign: "start",
      color: "black",
      backgroundColor: state.isFocused ? "#e6f3ff" : "white",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#666",
      textAlign: "start",
    }),
    input: (base) => ({
      ...base,
      color: "black",
    }),
  };

  const quarterOptions = [
    { value: "الربع الأول", label: "الربع الأول" },
    { value: "الربع الثاني", label: "الربع الثاني" },
    { value: "الربع الثالث", label: "الربع الثالث" },
    { value: "الربع الرابع", label: "الربع الرابع" },
  ];

  const methodOptions = [
    { value: "شراء مباشر", label: "شراء مباشر" },
    { value: "منافسة عامة", label: "منافسة عامة" },
    { value: "اتفاقية إطارية", label: "اتفاقية إطارية" },
  ];

  const typeOptions = [
    { value: "تشغيلي", label: "تشغيلي" },
    { value: "استراتيجي", label: "استراتيجي" },
    { value: "إسهامي / تشغيلي", label: "إسهامي / تشغيلي" },
    { value: "متكرر", label: "متكرر" },
  ];

  // validate form before saving
  const validateForm = () => {
    if (!formData.competition || formData.competition.trim() === "") {
      toast.error("يرجى إدخال اسم المنافسة!", {
        containerId: "modal-container",
      });
      return false;
    }
    if (!formData.budget || Number(formData.budget) <= 0) {
      toast.error("يرجى إدخال اسم المنافسة!", {
        containerId: "modal-container",
      });
      return false;
    }
    if (maxBudget && Number(formData.budget) > maxBudget) {
      toast.error(
        `الميزانية المدخلة أكبر من المبلغ المتاح (${maxBudget.toLocaleString()})`
      );
      return false;
    }
    if (!formData.requester || formData.requester.trim() === "") {
      toast.error("يرجى إدخال اسم المنافسة!", {
        containerId: "modal-container",
      });
      return false;
    }
    return true;
  };

  //  handle save with validation
  const handleSave = () => {
    if (!validateForm()) return;
    onAddAnother && onAddAnother("save", true);
    toast.success("تمت إضافة المنافسة بنجاح!", {
      containerId: "modal-container",
    });
  };
  //  handle add another
  const handleAddAnotherClick = (e) => {
    e.stopPropagation();
    if (!validateForm()) return;
    onAddAnother && onAddAnother("add");
    toast.success("تمت إضافة المنافسة بنجاح!", {
      containerId: "modal-container",
    });
  };

  return (
    <div className="competition-details-wrapper">
      <div className="sector-info-container">
        <div className="sector-header">القطاع</div>

        <div className="sector-box">
          <div className="container-sector-title">
            <h4 className="sector-title">
              المصارف و البرامج التنموية / الشراكات التنموية
            </h4>
          </div>

          <div className="sector-details">
            <p className="annual-budget">
              <span className="label-title">الميزانية السنوية:</span>
              <span className="value green">0 ر.س</span>
            </p>
            <p className="spent-budget">
              <span className="label-title">الميزانية المنصرفة:</span>
              <span className="value-colors">7,998,550.00 ر.س</span>
            </p>
            <p className="remaining-budget">
              <span className="label-title">الميزانية المتبقية:</span>
              <span className="value red">-7,998,550.00 ر.س</span>
            </p>
          </div>

          <p className="sector-note">
            إذا تجاوزت الميزانية المطلوبة يرجى إرفاق الموافقة
          </p>
        </div>
      </div>

      <hr />
      <h4 className="competition-details-title">تفاصيل المنافسة</h4>

      <div className="competition-details-grid">
        <div className="competition-details-item">
          <label>اسم المنافسة *</label>
          <input
            type="text"
            value={formData.competition || ""}
            onChange={(e) => handleChange("competition", e.target.value)}
            placeholder="أدخل اسم المنافسة"
          />
        </div>

        <div className="competition-details-item">
          <label>القطاع</label>
          <input
            type="text"
            value={formData.sector || ""}
            onChange={(e) => handleChange("sector", e.target.value)}
          />
        </div>

        <div className="competition-details-item">
          <label>تاريخ الإعلان عن الطرح</label>
          <Select
            isRtl={true}
            styles={selectStyles}
            options={quarterOptions}
            value={
              quarterOptions.find((opt) => opt.value === formData.date) || null
            }
            onChange={(selected) =>
              handleChange("date", selected ? selected.value : "")
            }
            placeholder="اختر الربع"
          />
        </div>

        <div className="competition-details-item">
          <label>سنة المنافسة</label>
          <input
            type="number"
            value={formData.year || ""}
            onChange={(e) => handleChange("year", e.target.value)}
            placeholder="مثال: 2025"
          />
        </div>

        <div className="competition-details-item">
          {/* <input
            type="number"
            value={formData.budget || ""}
            onChange={(e) => handleChange("budget", e.target.value)}
          /> */}

          <label>
            الميزانية
            {maxBudget && (
              <span className="max-budget-text">
                (الحد الأقصى {maxBudget.toLocaleString()})
              </span>
            )}
          </label>

          <input
            type="number"
            min="0"
            max={maxBudget}
            value={formData.budget || ""}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (maxBudget && value > maxBudget) {
                toast.error(
                  `الميزانية لا يمكن أن تتجاوز ${maxBudget.toLocaleString()}`
                );
                return;
              }

              handleChange("budget", value);
            }}
          />
        </div>

        <div className="competition-details-item">
          <label>صاحب الطلب</label>
          <input
            type="text"
            value={formData.requester || ""}
            onChange={(e) => handleChange("requester", e.target.value)}
          />
        </div>

        <div className="competition-details-item">
          <label>أسلوب الشراء</label>
          <Select
            isRtl={true}
            styles={selectStyles}
            options={methodOptions}
            value={
              methodOptions.find((opt) => opt.value === formData.method) || null
            }
            onChange={(selected) =>
              handleChange("method", selected ? selected.value : "")
            }
            placeholder="اختر"
          />
        </div>

        <div className="competition-details-item">
          <label>نوع المنافسة</label>
          <Select
            isRtl={true}
            styles={selectStyles}
            options={typeOptions}
            value={
              typeOptions.find((opt) => opt.value === formData.type) || null
            }
            onChange={(selected) =>
              handleChange("type", selected ? selected.value : "")
            }
            placeholder="اختر"
          />
        </div>

        <div className="competition-details-item">
          <label>نوع وظيفة الأعمال والمشتريات</label>
          <input
            type="text"
            value={formData.function || ""}
            onChange={(e) => handleChange("function", e.target.value)}
          />
        </div>

        <div className="competition-details-item">
          <label>مكان التنفيذ</label>
          <input
            type="text"
            value={formData.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div className="competition-details-item competition-details-textarea">
          <label>الوصف</label>
          <textarea
            rows="2"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="competition-details-item competition-details-textarea">
          <label>الملاحظات</label>
          <textarea
            rows="2"
            value={formData.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>

        <div className="competition-details-item competition-details-upload">
          <label>إرفاق ملف المنافسة</label>
          <input type="file" onChange={handleFileChange} />
          {formData.attachment && (
            <p className="competition-details-file">
              <strong>الملف المرفق:</strong> {formData.attachment}
            </p>
          )}
        </div>
      </div>

      <div className="competition-details-btn-continer">
        <button className="save-button" onClick={handleSave}>
          حفظ
        </button>
        {showAddAnother && (
          <button className="save-button" onClick={handleAddAnotherClick}>
            إضافة أخرى
          </button>
        )}
      </div>
    </div>
  );
};

export default CompetitionDetailsII;
