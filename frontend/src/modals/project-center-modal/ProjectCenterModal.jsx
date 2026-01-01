import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./projcentermodal.scss";

const ProjectCenterModal = ({
  isOpen,
  projectToEdit = null,
  departments = [],
  phases = [],
  managers = [],
  onClose,
  onSubmit,
}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [phase, setPhase] = useState("");
  const [manager, setManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [owner, setOwner] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [budget, setBudget] = useState("");
  const [spent, setSpent] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (projectToEdit) {
      setProjectTitle(projectToEdit.project_title || "");
      setDescription(projectToEdit.description || "");
      setDepartment(projectToEdit.department_id || "");
      setPhase(projectToEdit.phase_id || "");
      setManager(projectToEdit.manager_id || "");
      setStartDate(projectToEdit.start_date || "");
      setEndDate(projectToEdit.end_date || "");
      setOwner(projectToEdit.owner_id || "");
      setSponsor(projectToEdit.sponsor_id || "");
      setBudget(projectToEdit.project_budget || "");
      setSpent(projectToEdit.project_spent || "");
    } else {
      resetForm();
    }
  }, [projectToEdit, isOpen]);

  const resetForm = () => {
    setProjectTitle("");
    setDescription("");
    setDepartment("");
    setPhase("");
    setManager("");
    setStartDate("");
    setEndDate("");
    setOwner("");
    setSponsor("");
    setBudget("");
    setSpent("");
  };

  if (!isOpen) return null;

  const handleSubmit = () => {
    const trimmedTitle = projectTitle.trim();
    const trimmedDescription = description.trim();

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !department ||
      !phase ||
      !manager ||
      !startDate ||
      !endDate
    ) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
      return;
    }

    const payload = {
      id: projectToEdit?.id,
      projectTitle: trimmedTitle,
      description: trimmedDescription,
      department,
      phase,
      manager,
      startDate,
      endDate,
      owner,
      sponsor,
      budget: Number(budget) || 0,
      spent: Number(spent) || 0,
    };

    onSubmit(payload);
    toast.success(
      projectToEdit ? "تم تحديث المشروع بنجاح" : "تمت إضافة المشروع بنجاح"
    );

    resetForm();
    onClose();
  };

  return (
    <div className="add-project-overlay">
      <div className="add-project-container">
        <div className="add-project-header">
          <h3>{projectToEdit ? "تعديل المشروع" : "إضافة مشروع جديد"}</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className="add-project-body">
          <div>
            <label>عنوان المشروع</label>
            <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
          </div>

          <div>
            <label>القسم</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">اختر القسم</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label>المرحلة</label>
            <select value={phase} onChange={(e) => setPhase(e.target.value)}>
              <option value="">اختر المرحلة</option>
              {phases.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label>مدير المشروع</label>
            <select value={manager} onChange={(e) => setManager(e.target.value)}>
              <option value="">اختر المدير</option>
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.firstname} {m.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>المالك</label>
            <select value={owner} onChange={(e) => setOwner(e.target.value)}>
              <option value="">اختر المالك</option>
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.firstname} {m.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>الراعي</label>
            <select value={sponsor} onChange={(e) => setSponsor(e.target.value)}>
              <option value="">اختر الراعي</option>
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.firstname} {m.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>تاريخ البداية</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div>
            <label>تاريخ النهاية</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <div>
            <label>الميزانية</label>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>

          <div>
            <label>المصروف</label>
            <input type="number" value={spent} onChange={(e) => setSpent(e.target.value)} />
          </div>

          <div>
            <label>الوصف</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <div className="add-project-actions">
          <button className="cancel-button" onClick={onClose}>إلغاء</button>
          <button className="save-button" onClick={handleSubmit}>
            {projectToEdit ? "تحديث" : "حفظ"}
          </button>
        </div>
      </div>

      <ToastContainer rtl theme="colored" autoClose={3000} />
    </div>
  );
};

export default ProjectCenterModal;
