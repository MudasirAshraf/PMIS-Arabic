import React, { useState } from "react";
import Select from "react-select";
import CompetitionDetailsII from "../../components/competition-details/CompetitionDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./competitionmodal.scss";

const projectData = [
  { id: 1, name: "المشروع أ", available: 300000, required: 0 },
  { id: 2, name: "المشروع ب", available: 200000, required: 0 },
  { id: 3, name: "المشروع ج", available: 150000, required: 0 },
];

const reactSelectStyles = {
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    backgroundColor: "#fff",
    color: "#000",
  }),

  control: (base) => ({
    ...base,
    border: "1px solid #aaa",
    color: "#000",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#000",
    textAlign: "start",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#666",
    textAlign: "start",
  }),

  input: (base) => ({
    ...base,
    color: "#000",
    textAlign: "start",
  }),

  option: (base, state) => ({
    ...base,
    textAlign: "start",
    color: "black",
    backgroundColor: state.isFocused ? "#e6f3ff" : "white",
    cursor: "pointer",
  }),
};

const CompetitionModal = ({ close, onSave, competitions }) => {
  const yesSteps = [
    "إضافة البيانات المفقودة؟",
    "اختيار المصدر / المشروع",
    "اختيار المشروع",
    "إدخال الميزانية",
    "إجراءات المشروع",
    "اختيار الإجراء",
    // "التأكيد",
  ];

  const noSteps = [
    "إضافة البيانات المفقودة؟",
    "اختيار المشروع",
    "النموذج",
    // "التأكيد",
  ];

  const yesSAPSteps = [
    "إضافة البيانات المفقودة؟",
    "اختيار المصدر / المشروع",
    "نموذج ساب",
    // "التأكيد",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0]);

  const [needNewData, setNeedNewData] = useState(null);
  const [yesSourceType, setYesSourceType] = useState(null);

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedNoProject, setSelectedNoProject] = useState(null);
  const [projectRows, setProjectRows] = useState([]);

  const [actionType, setActionType] = useState(null);
  const [competitionData, setCompetitionData] = useState({});

  // الخطوات الديناميكية
  const dynamicSteps =
    needNewData === "no"
      ? noSteps
      : needNewData === "yes" && yesSourceType === "sap"
      ? yesSAPSteps
      : actionType === "existing"
      ? [...yesSteps, "النموذج"]
      : yesSteps;

  // SUM of required amounts
  const totalRequired = projectRows.reduce(
    (sum, p) => sum + (Number(p.required) || 0),
    0
  );

  const goNext = () => {
    //  Validation for Budget Entry Step
    if (
      currentStep === 3 &&
      needNewData === "yes" &&
      yesSourceType === "existing"
    ) {
      if (totalRequired <= 0) {
        toast.error("يرجى إدخال مبلغ مطلوب واحد على الأقل", {
          containerId: "modal-container",
        });
        return;
      }
      // validate each row
      for (let p of projectRows) {
        if (p.required < 0) {
          toast.error("لا يمكن إدخال قيمة سالبة", {
            containerId: "modal-container",
          });
          return;
        }

        if (p.required > p.available) {
          toast.error(
            `المبلغ المطلوب للمشروع ${p.name} أكبر من المبلغ المتاح`,
            {
              containerId: "modal-container",
            }
          );
          return;
        }
      }
    }

    setCurrentStep((prev) => {
      const next = prev + 1;

      if (needNewData === "yes" && yesSourceType === "existing" && next === 3) {
        const rows = selectedProjects.map((p) => ({
          ...p,
          required: p.required || 0,
        }));
        setProjectRows(rows);
      }

      if (!completedSteps.includes(next)) {
        setCompletedSteps([...completedSteps, next]);
      }

      return next;
    });
  };

  const goPrev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const goToStep = (index) =>
    completedSteps.includes(index) && setCurrentStep(index);

  const handleRequiredChange = (index, value) => {
    const updated = [...projectRows];
    updated[index].required = Number(value);
    setProjectRows(updated);
  };

  const handleChange = (field, value) => {
    setCompetitionData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAnother = () => {
    setCompetitionData({});
  };

  const onAddAnotherHandler = (action = false) => {
    if (!competitionData) return;

    const isValid = () => {
      if (
        !competitionData.competition ||
        competitionData.competition.trim() === ""
      ) {
        toast.error("يرجى إدخال اسم المنافسة!");
        return false;
      }
      if (!competitionData.budget || Number(competitionData.budget) <= 0) {
        toast.error("يرجى إدخال الميزانية بشكل صحيح!");
        return false;
      }
      if (
        !competitionData.requester ||
        competitionData.requester.trim() === ""
      ) {
        toast.error("يرجى إدخال صاحب الطلب!");
        return false;
      }
      return true;
    };

    if (!isValid()) return;

    if (action === "save") {
      onSave && onSave(competitionData, true);
      toast.success("تم حفظ المنافسة بنجاح!");
      close();
    } else if (action === "add") {
      handleAddAnother();
      onSave && onSave(competitionData, false);
      toast.success("تمت إضافة المنافسة بنجاح!");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-box">
            <p>هل تحتاج لإضافة البيانات المفقودة؟</p>
            <div className="yes-no-box">
              <button
                className="save-button"
                onClick={() => {
                  setNeedNewData("yes");
                  goNext();
                }}
              >
                نعم
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setNeedNewData("no");
                  goNext();
                }}
              >
                لا
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-box step-center">
            {needNewData === "no" ? (
              <div className="container-stepbox">
                <p className="step-para">اختر المنافسة الحالية</p>

                <Select
                  isMulti={false}
                  options={competitions.map((c) => ({
                    value: c.competition,
                    label: c.competition,
                  }))}
                  value={selectedNoProject}
                  onChange={(item) => {
                    setSelectedNoProject(item);

                    const existingData = competitions.find(
                      (c) => c.competition === item.value
                    );

                    if (existingData) {
                      setCompetitionData(existingData);
                    }

                    goNext();
                  }}
                  styles={reactSelectStyles}
                  placeholder="اختر المنافسة"
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
            ) : (
              <div className="choice-container">
                <h3>يرجى اختيار مصدر الميزانية</h3>

                <div className="choice-buttons">
                  <button
                    className="Yes-btn"
                    onClick={() => {
                      setYesSourceType("existing");
                      goNext();
                    }}
                  >
                    المشاريع القائمة
                  </button>

                  <button
                    className="No-btn"
                    onClick={() => {
                      setYesSourceType("sap");
                      setCompetitionData({});
                      goNext();
                    }}
                  >
                    ساب
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="step-box step-center">
            {needNewData === "no" && (
              <CompetitionDetailsII
                data={competitionData}
                onChange={handleChange}
                mode="new"
                budgetStatus="yes"
                showAddAnother={false}
                onAddAnother={onAddAnotherHandler}
              />
            )}

            {needNewData === "yes" && yesSourceType === "existing" && (
              <div className="container-stepbox">
                <h3 className="step-para">اختر مشروع واحد أو أكثر</h3>

                <Select
                  isMulti
                  options={projectData.map((p) => ({
                    value: p.id,
                    label: `${p.name} — ${p.available.toLocaleString()}`,
                    ...p,
                  }))}
                  onChange={(items) => setSelectedProjects(items || [])}
                  styles={reactSelectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
            )}

            {needNewData === "yes" && yesSourceType === "sap" && (
              <CompetitionDetailsII
                data={competitionData}
                onChange={handleChange}
                mode="new"
                budgetStatus="yes"
                showAddAnother={true}
                onAddAnother={onAddAnotherHandler}
              />
            )}
          </div>
        );

      case 3:
        if (needNewData === "no")
          return (
            <div>
              <p>تم الإكمال بنجاح!</p>
              <button onClick={close}>إغلاق</button>
            </div>
          );

        if (yesSourceType === "sap")
          return (
            <div>
              <p>تم نموذج ساب</p>
              <button onClick={close}>إغلاق</button>
            </div>
          );

        return (
          <div className="step-box">
            <p>المشاريع المختارة</p>

            <div className="table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>اسم المشروع</th>
                    <th>المتاح</th>
                    <th>المطلوب</th>
                  </tr>
                </thead>

                <tbody>
                  {projectRows.map((p, idx) => (
                    <tr key={p.id}>
                      <td>
                        <span
                          className="cell-text"
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty(
                              "--tooltip-top",
                              `${rect.top + rect.height}px`
                            );
                            e.currentTarget.style.setProperty(
                              "--tooltip-left",
                              `${rect.left}px`
                            );
                          }}
                          data-fulltext={p.name ?? "_"}
                        >
                          {p.name ?? "_"}
                        </span>
                      </td>

                      <td>
                        <span
                          className="cell-text"
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty(
                              "--tooltip-top",
                              `${rect.top + rect.height}px`
                            );
                            e.currentTarget.style.setProperty(
                              "--tooltip-left",
                              `${rect.left}px`
                            );
                          }}
                          data-fulltext={p.available.toLocaleString()}
                        >
                          {p.available.toLocaleString()}
                        </span>
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          max={p.available}
                          value={p.required}
                          onChange={(e) =>
                            handleRequiredChange(idx, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-box step-center">
            <p>المشاريع</p>
            <div class="available">
              <p>
                متاح{" "}
                <span className="amount">{totalRequired.toLocaleString()}</span>
              </p>
            </div>

            <div className="actions-buttons">
              <div
                className="action-btn"
                onClick={() => {
                  setActionType("existing");
                  goNext();
                }}
              >
                تعديل
                <br />
                منافسة الحالية
              </div>

              <div
                className="action-btn"
                onClick={() => {
                  setActionType("new");
                  goNext();
                }}
              >
                إضافة
                <br />
                منافسة جديدة
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-box">
            {actionType === "existing" && (
              <div className="container-stepbox">
                <h3 className="step-para">فضلاً اختر المشروع</h3>

                <Select
                  isMulti={false}
                  options={projectData.map((p) => ({
                    value: p.id,
                    label: p.name,
                    ...p,
                  }))}
                  onChange={() => goNext()}
                  styles={reactSelectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
            )}

            {actionType === "new" && (
              <>
                <CompetitionDetailsII
                  data={competitionData}
                  onChange={handleChange}
                  mode="new"
                  budgetStatus="yes"
                  showAddAnother={true}
                  onAddAnother={onAddAnotherHandler}
                  maxBudget={totalRequired}
                />
                {/* <button onClick={goNext}>التالي</button> */}
              </>
            )}
          </div>
        );

      case 6:
        return (
          <div className="step-box">
            {actionType === "existing" ? (
              <>
                <CompetitionDetailsII
                  data={competitionData}
                  onChange={handleChange}
                  mode="new"
                  budgetStatus="yes"
                  showAddAnother={true}
                  onAddAnother={onAddAnotherHandler}
                  maxBudget={totalRequired}
                />
                {/* <button onClick={goNext}>التالي</button> */}
              </>
            ) : (
              <>
                <p>تم الإكمال بنجاح!</p>
                <button onClick={close}>إغلاق</button>
              </>
            )}
          </div>
        );

      // case 7:
      //   return (
      //     <div className="step-box">
      //       <p>تم الإكمال بنجاح!</p>
      //       <button onClick={close}>إغلاق</button>
      //     </div>
      //   );

      default:
        return null;
    }
  };

  return (
    <div className="cm2-overlay" onClick={close}>
      <div className="cm2-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-comp-modal">
          <h3>طلب المنافسة</h3>
          <button className="close-btn-comp-modal" onClick={close}>
            ×
          </button>
        </div>
        <div className="cm2-timeline">
          {dynamicSteps.map((label, index) => (
            <div
              key={index}
              className={`cm2-step
                ${index === currentStep ? "active" : ""}
                ${completedSteps.includes(index) ? "unlocked" : "locked"}`}
              onClick={() => goToStep(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="cm2-body">{renderStep()}</div>

        <div className="cm2-footer">
          <button
            className="cancel-button"
            disabled={currentStep === 0}
            onClick={goPrev}
          >
            السابق ►
          </button>

          {currentStep < dynamicSteps.length - 1 &&
            !(needNewData === "yes" && yesSourceType === "sap") && (
              <button
                className="save-button"
                onClick={goNext}
                disabled={
                  currentStep === 3 &&
                  needNewData === "yes" &&
                  yesSourceType === "existing" &&
                  totalRequired <= 0
                }
              >
                ◄ التالي
              </button>
            )}
        </div>
      </div>
      {/* Toast-Container */}
      <ToastContainer
        containerId="modal-container"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 99999 }}
      />
    </div>
  );
};

export default CompetitionModal;
