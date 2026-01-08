import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import HistoryModal from "../../modals/history-modal/HistoryModal";
import WorkflowModal from "../../modals/workflow-modal/WorkFlowModal";
import WorkflowTable from "../../components/workflow-table/WorkflowTable";
import AI from "../../assets/documents/AI.pdf";
import SidebarTable from "../../components/sidebar-table/SidebarTable";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import "./approval.scss";

const Approval = () => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

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

  const approvalsData = [
    {
      id: 1,
      projectName: "لا توجد",
      list: "المنافسات",
      stageItem: "Test munafasa",
      requester: "Mudasir Ashraf - مدثر أشرف",
      assignedTo: "Mudasir Ashraf - مدثر أشرف",
      sentDate: "22/07/2024",
      dueDate: "27/07/2024",
      status: "الموافقة من مالك المشروع",
    },
    {
      id: 2,
      projectName: "لا توجد",
      list: "المنافسات",
      stageItem: "Test name change",
      requester: "Mudasir Ashraf - مدثر أشرف",
      assignedTo: "Mudasir Ashraf - مدثر أشرف",
      sentDate: "30/09/2023",
      dueDate: "05/01/2024",
      status: "الموافقة من مالك المشروع",
    },
    {
      id: 3,
      projectName: "this is a beta test project",
      list: "المخرجات",
      stageItem: "task 3",
      requester: "Mudasir Ashraf - مدثر أشرف",
      assignedTo: "Mudasir Ashraf - مدثر أشرف",
      sentDate: "06/01/2024",
      dueDate: "11/01/2024",
      status: "الموافقة من مالك المشروع",
    },
    {
      id: 4,
      projectName: "this is a beta test project",
      list: "إغلاق المشروع",
      stageItem: "إغلاق المشروع",
      requester: "Mudasir Ashraf - مدثر أشرف",
      assignedTo: "Mudasir Ashraf - مدثر أشرف",
      sentDate: "24/04/2025",
      dueDate: "29/04/2025",
      status: "الموافقة من مدير المبادرة",
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

  const historyData = [
    {
      id: 1,
      phase: "المرحلة 1",
      approvedBy: "Mudasir Ashraf",
      status: "تمت الموافقة",
      date: "01/06/2025",
      comment: "تمت الموافقة على المهمة بنجاح.",
    },
    {
      id: 2,
      phase: "المرحلة 2",
      approvedBy: "مدير المشروع",
      status: "قيد المراجعة",
      date: "02/06/2025",
      comment: "بانتظار موافقة إضافية.",
    },
  ];

  const completedTasks = [
    {
      id: 101,
      projectName: "this is a beta test project",
      list: "إغلاق المشروع",
      stageItem: "task 6",
      requester: "Mudasir Ashraf",
      assignedTo: "Mudasir Ashraf",
      sentDate: "01/01/2025",
      dueDate: "05/01/2025",
      status: "تمت الموافقة",
    },
    {
      id: 102,
      projectName: "مشروع داخلي",
      list: "المخرجات",
      stageItem: "task 9",
      requester: "Ahmed Ali",
      assignedTo: "Mohammed",
      sentDate: "12/02/2025",
      dueDate: "17/02/2025",
      status: "تمت الموافقة",
    },
    {
      id: 103,
      projectName: "مشروع تطوير",
      list: "المخرجات",
      stageItem: "task 10",
      requester: "Layla Hassan",
      assignedTo: "Khalid",
      sentDate: "10/03/2025",
      dueDate: "15/03/2025",
      status: "تمت الموافقة",
    },
    {
      id: 104,
      projectName: "تحسين البنية التحتية",
      list: "التخطيط",
      stageItem: "task 11",
      requester: "Omar Fahad",
      assignedTo: "Salma",
      sentDate: "20/03/2025",
      dueDate: "25/03/2025",
      status: "تمت الموافقة",
    },
    {
      id: 105,
      projectName: "إعادة هيكلة النظام",
      list: "التخطيط",
      stageItem: "task 12",
      requester: "Reem Said",
      assignedTo: "Ali",
      sentDate: "01/04/2025",
      dueDate: "06/04/2025",
      status: "تمت الموافقة",
    },
    {
      id: 106,
      projectName: "نظام إدارة الموارد",
      list: "المنافسات",
      stageItem: "task 13",
      requester: "Yousef Adel",
      assignedTo: "Nada",
      sentDate: "07/04/2025",
      dueDate: "12/04/2025",
      status: "تمت الموافقة",
    },
    {
      id: 107,
      projectName: "مشروع خارجي",
      list: "المخرجات",
      stageItem: "task 14",
      requester: "Sara Nabil",
      assignedTo: "Ahmed",
      sentDate: "14/04/2025",
      dueDate: "19/04/2025",
      status: "تمت الموافقة",
    },
    {
      id: 108,
      projectName: "تحديث بوابة العملاء",
      list: "البرمجة",
      stageItem: "task 15",
      requester: "Mahmoud",
      assignedTo: "Huda",
      sentDate: "21/04/2025",
      dueDate: "26/04/2025",
      status: "تمت الموافقة",
    },
    {
      id: 109,
      projectName: "تحسين الأداء",
      list: "المخرجات",
      stageItem: "task 16",
      requester: "Lina",
      assignedTo: "Hassan",
      sentDate: "28/04/2025",
      dueDate: "03/05/2025",
      status: "تمت الموافقة",
    },
    {
      id: 110,
      projectName: "ترقية الخوادم",
      list: "إغلاق المشروع",
      stageItem: "task 17",
      requester: "Nour",
      assignedTo: "Faisal",
      sentDate: "05/05/2025",
      dueDate: "10/05/2025",
      status: "تمت الموافقة",
    },
    {
      id: 111,
      projectName: "مشروع بيئي",
      list: "التخطيط",
      stageItem: "task 18",
      requester: "Aisha",
      assignedTo: "Sami",
      sentDate: "12/05/2025",
      dueDate: "17/05/2025",
      status: "تمت الموافقة",
    },
    {
      id: 112,
      projectName: "نظام الفوترة",
      list: "المخرجات",
      stageItem: "task 19",
      requester: "Talal",
      assignedTo: "Nadia",
      sentDate: "18/05/2025",
      dueDate: "23/05/2025",
      status: "تمت الموافقة",
    },
    {
      id: 113,
      projectName: "تحسين الجودة",
      list: "المخرجات",
      stageItem: "task 20",
      requester: "Hani",
      assignedTo: "Dana",
      sentDate: "24/05/2025",
      dueDate: "29/05/2025",
      status: "تمت الموافقة",
    },
    {
      id: 114,
      projectName: "نقل البيانات",
      list: "إغلاق المشروع",
      stageItem: "task 21",
      requester: "Basma",
      assignedTo: "Zaid",
      sentDate: "30/05/2025",
      dueDate: "04/06/2025",
      status: "تمت الموافقة",
    },
    {
      id: 115,
      projectName: "إعداد التقارير",
      list: "المخرجات",
      stageItem: "task 22",
      requester: "Rami",
      assignedTo: "Wafa",
      sentDate: "02/06/2025",
      dueDate: "07/06/2025",
      status: "تمت الموافقة",
    },
    {
      id: 116,
      projectName: "مشروع تجريبي",
      list: "المنافسات",
      stageItem: "task 23",
      requester: "Fadi",
      assignedTo: "Rana",
      sentDate: "05/06/2025",
      dueDate: "10/06/2025",
      status: "تمت الموافقة",
    },
  ];

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSidebar]);

  return (
    <div className="main-container-approvals-page">
      {/* Header */}
      <div className="header-approvals-page fs-lg fw-700 lh-1-2">
        <p>بوابة إتقان / بوابة المشاريع</p>
      </div>
      {/* Search and Count */}
      <div className="container-search-length">
        <p className="search-para fs-md fw-700 lh-1-2">
          جميع المهام{" "}
          <span className="search-span fs-sm fw-700 lh-1">
            {approvalsData.length}
          </span>
        </p>
        <div className="search-box">
          <input type="text" placeholder="ابحث..." className="search-input" />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>

      {/* Table */}
      <WorkflowTable
        tableData={approvalsData}
        historyData={historyData}
        attachments={attachments}
        columns={columnHeaders}
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

      {/* Worlflow Modals */}
      {showWorkflowModal && (
        <WorkflowModal
          workflowData={modalData}
          onClose={() => {
            setShowWorkflowModal(false);
            setModalData(null);
          }}
        />
      )}
      {/* History Modal */}
      {showHistoryModal && (
        <HistoryModal
          data={modalData}
          onClose={() => {
            setShowHistoryModal(false);
            setModalData(null);
          }}
        />
      )}
      {/* Button to toggle sidebar */}
      <div className="btn-approvals-container">
        <button
          className="btn-approvals fs-l fw-700 lh-1-2"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          المهام المكتملة
        </button>
      </div>
      {/* // Show-SideBar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
            />
            <motion.div
              className="sidebar-table-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="sidebar-header">
                <p className="fs-md fw-700 lh-1-2">المهام المكتملة</p>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="close-sidebar-btn"
                >
                  <IoIosArrowForward size={20} />
                </button>
              </div>
              <SidebarTable
                tableData={completedTasks}
                columns={columnHeaders}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Approval;
