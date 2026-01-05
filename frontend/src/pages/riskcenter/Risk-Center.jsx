import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useTheme } from "../../ThemeContext";
import { RiSketching } from "react-icons/ri";
import Table from "../../components/table/Table";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import RiskModal from "../../modals/risk-modal/RiskModal";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import "./riskcenter.scss";

const RiskCenter = () => {
  const { theme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  // all columns but show only 5 in the table
  const allColumns = [
    "الرمز",
    "عنوان الخطر",
    "مالك الخطر",
    "تاريخ الإنشاء المتوقع",
    "التأثير",
    "الإحتمالية",
    "التقييم",
    "الحالة",
    "الأهمية",
    "التسليط الضوء",
    "وصف السبب",
  ];
  const displayedColumns = allColumns.slice(0, 5);

  const [data, setData] = useState([
    [
      ".",
      "سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق سوء التنسيق",
      "Haya",
      "2025-03-01",
      "8",
      "4",
      "عالي",
      "فعال",
      "1",
      "3",
      "5",
    ],
    [
      ".",
      "نقص الموارد",
      "Ali",
      "2025-03-05",
      "7",
      "5",
      "متوسط",
      "غير فعال",
      "1",
      "3",
      "5",
    ],
    [
      ".",
      "سوء التنسيق",
      "Haya",
      "2025-03-01",
      "8",
      "4",
      "عالي",
      "فعال",
      "1",
      "3",
      "5",
    ],
    [
      ".",
      "نقص الموارد",
      "Ali",
      "2025-03-05",
      "7",
      "5",
      "متوسط",
      "غير فعال",
      "1",
      "3",
      "5",
    ],
    [
      ".",
      "سوء التنسيق",
      "Haya",
      "2025-03-01",
      "8",
      "4",
      "عالي",
      "فعال",
      "1",
      "3",
      "5",
    ],
    [
      ".",
      "نقص الموارد",
      "Ali",
      "2025-03-05",
      "7",
      "5",
      "متوسط",
      "غير فعال",
      "1",
      "3",
      "5",
    ],
  ]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showRiskChat, setShowRiskChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  // Delete
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    setData(data.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };
  // Chat
  const handleChatClick = () => {
    setShowRiskChat(true);
  };

  const closeRiskChat = () => {
    setShowRiskChat(false);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
    }
  };
  // Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const handleRiskClick = (risk, index) => {
    const keys = [
      "code",
      "title",
      "owner",
      "endDate",
      "importance",
      "status",
      "result",
      "highlight",
      "description",
      "plan",
      "causeDescription",
    ];
    const riskObject = keys.reduce(
      (acc, key, i) => {
        acc[key] = risk[i] || "";
        return acc;
      },
      { index }
    );

    setSelectedRisk(riskObject);
    setIsEditModalOpen(true);
  };

  const handleSaveRisk = (updatedRisk) => {
    if (typeof updatedRisk.index !== "number") {
      // Add new risk
      setData((prevData) => [
        ...prevData,
        [
          updatedRisk.code,
          updatedRisk.title,
          updatedRisk.owner,
          updatedRisk.endDate,
          updatedRisk.importance,
          updatedRisk.status,
          updatedRisk.result,
          updatedRisk.highlight,
          updatedRisk.description,
          updatedRisk.plan,
          updatedRisk.causeDescription,
        ],
      ]);
    } else {
      // Update existing risk
      setData((prevData) =>
        prevData.map((risk, index) =>
          index === updatedRisk.index
            ? [
                updatedRisk.code,
                updatedRisk.title,
                updatedRisk.owner,
                updatedRisk.endDate,
                updatedRisk.importance,
                updatedRisk.status,
                updatedRisk.result,
                updatedRisk.highlight,
                updatedRisk.description,
                updatedRisk.plan,
                updatedRisk.causeDescription,
              ]
            : risk
        )
      );
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="main-Container-Risk-Center">
      {/* Header */}
      <div className="header-risk-center">
        {/* I */}
        <div className="first-header-risk-center">
          <RiSketching
            className="react-icon"
            size={35}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            مركز المخاطر هو وحدة مخصصة لتحديد وتحليل وإدارة المخاطر المحتملة.
          </p>
        </div>
        {/* II */}
        <div>
          <button
            className="add-modal-button fs-md fw-600 lh-1-2"
            onClick={() => {
              setSelectedRisk({
                code: "",
                title: "",
                owner: "",
                endDate: "",
                importance: "",
                status: "",
                result: "",
                highlight: "",
                description: "",
                plan: "",
                causeDescription: "",
                index: null,
              });
              setIsEditModalOpen(true);
            }}
          >
            <MdEdit
              size={17}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p>نافذة المخاطر</p>
          </button>
        </div>
      </div>
      {/* Section-I */}
      {/* Search & Filter Buttons */}
      <section className="section-I-risk-center">
        <button
          className="query-btn fs-l fw-600 lh-1-3"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <FaSearch
            size={20}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p>بحث</p>
        </button>

        <button
          className="query-btn fs-l fw-600 lh-1-3"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <FaFilter
            size={20}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p>تصفية</p>
        </button>
      </section>
      {/* Search & Filter Views */}
      <SearchFilterView
        showSearch={showSearch}
        showFilter={showFilter}
        setShowSearch={setShowSearch}
        setShowFilter={setShowFilter}
        filterLabels={["التصنيف", "الأولوية", "المصدر", "التاريخ"]}
      />
      {/* Section-II */}
      <div className="table-Risk-Center">
        <Table
          columns={displayedColumns}
          data={data}
          displayedData={data.map((row) => row.slice(0, 5))}
          onDelete={handleDeleteClick}
          onChat={handleChatClick}
          onEdit={(index) => handleRiskClick(data[index], index)}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteIndex !== null}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIndex(null)}
        />
        {/* Chat Modal */}
        <ChatModal
          isOpen={showRiskChat}
          onClose={closeRiskChat}
          messages={chatMessages}
          currentMessage={currentMessage}
          onSendMessage={handleSendMessage}
          setCurrentMessage={setCurrentMessage}
        />
        {/* Edit Modal */}
        {isEditModalOpen && (
          <RiskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            riskData={selectedRisk}
            onSave={handleSaveRisk}
          />
        )}
      </div>
    </div>
  );
};
export default RiskCenter;
