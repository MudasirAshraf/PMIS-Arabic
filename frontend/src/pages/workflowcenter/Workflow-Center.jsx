import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useTheme } from "../../ThemeContext";
import HistoryModal from "../../modals/history-modal/HistoryModal";
import WorkflowModal from "../../modals/workflow-modal/WorkFlowModal";
import WorkflowTable from "../../components/workflow-table/WorkflowTable";
import AI from "../../assets/documents/AI.pdf";
import "./workflow.scss";

const WorkflowCenter = () => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { theme } = useTheme();

  const columnHeaders = [
    "اسم المشروع",
    "قائمة ذات الصلة",
    "عنصر ذات الصلة",
    "صاحب الطلب",
    "تعيين إلى",
    "تاريخ الإرسال",
    "تاريخ الإستحقاق",
    "المرحلة",
  ];

  // History-Modal-Data
  const HistoryModalData = [
    {
      id: 1,
      phase: "المرحلة 1",
      approvedBy: "Rajeh Alrajeh",
      status: "تم الرفض",
      date: "28/07/2024",
      comment: "ملاحظات افتراضية",
    },
    {
      id: 2,
      phase: "المرحلة 2",
      approvedBy: "Muteb Alrujayyi",
      status: "تم المراجعة",
      date: "29/07/2024",
      comment: "تمت مراجعة المشروع",
    },
  ];

  const tableData = [
    {
      id: 1,
      projectName:
        'مشروع تطوير و تصميم منظومة منصة الحساب الوقفي الرقمي "أوقاف PAY"',
      list: "المخرجات",
      stageItem: "المرحلة 3",
      requester: "Muteb Alrujayyi",
      assignedTo: "يوسف القحطاني - Yousf Alqublan",
      sentDate: "04/08/2024",
      dueDate: "09/08/2024",
      status: "مكتمل",
    },
    {
      id: 2,
      projectName:
        'مشروع تطوير و تصميم منظومة منصة الحساب الوقفي الرقمي "أوقاف PAY"',
      list: "المخرجات",
      stageItem: "المرحلة 3",
      requester: "Muteb Alrujayyi",
      assignedTo: "يوسف القحطاني - Yousf Alqublan",
      sentDate: "04/08/2024",
      dueDate: "09/08/2024",
      status: "مكتمل",
    },
  ];

  const attachments = [
    {
      name: "AI Introduction.pdf",
      type: "pdf",
      url: AI,
      date: "2024-08-01",
    },
    {
      name: "Project.docx",
      type: "docx",
      url: "/documents/sample.docx",
      date: "2024-08-03",
    },
  ];

  return (
    <div className="main-container-workflow-center">
      {/* Header */}
      <div className="header-workflow-center">
        <div className="first-header-workflow-center">
          <FaPencilAlt
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            مهام سير العمل - مشروع تطوير و تصميم منظومة منصة الحساب الوقفي
            الرقمي " أوقاف PAY "
          </p>
        </div>
      </div>

      {/* Search and Count */}
      <div className="container-search-length">
        <p className="search-para fs-md fw-700 lh-1-2">
          جميع الموارد{" "}
          <span className="search-span fs-sm fw-700 lh-1">
            {tableData.length}
          </span>
        </p>
        <div className="search-box">
          <input type="text" placeholder="ابحث..." className="search-input" />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>

      {/* Table Component */}
      <WorkflowTable
        tableData={tableData}
        historyData={HistoryModalData}
        columns={columnHeaders}
        attachments={attachments}
        onViewWorkflow={(data) => {
          setModalData(data);
          setShowWorkflowModal(true);
          setShowHistoryModal(false);
        }}
        onViewHistory={(data) => {
          setModalData(data);
          setShowHistoryModal(true);
          setShowWorkflowModal(false);
        }}
      />

      {/* History Modals */}
      {showHistoryModal && (
        <HistoryModal
          data={modalData}
          onClose={() => {
            setShowHistoryModal(false);
            setModalData(null);
          }}
        />
      )}
      {/* Workflow-Modal */}
      {showWorkflowModal && (
        <WorkflowModal
          workflowData={modalData}
          onClose={() => {
            setShowWorkflowModal(false);
            setModalData(null);
          }}
        />
      )}
    </div>
  );
};

export default WorkflowCenter;
