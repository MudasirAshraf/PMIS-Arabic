import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { PiSquaresFourBold } from "react-icons/pi";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import Table from "../../components/table/Table";
import ActionModal from "../../modals/action-modal/ActionModal";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import "./actioncenter.scss";

const ActionCenter = () => {
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
      "تأخير التسليم",
      "Omar",
      "2025-04-10",
      "6",
      "3",
      "منخفض",
      "فعال",
      "2",
      "4",
      "6",
    ],
    [
      ".",
      "خطأ في البيانات",
      "Lina",
      "2025-04-12",
      "9",
      "5",
      "عالي",
      "غير فعال",
      "2",
      "3",
      "7",
    ],
    [
      ".",
      "نقص الخبرة",
      "Sara",
      "2025-04-15",
      "5",
      "2",
      "متوسط",
      "فعال",
      "1",
      "2",
      "6",
    ],
    [
      ".",
      "مشكلة تقنية",
      "Ahmed",
      "2025-04-20",
      "7",
      "4",
      "عالي",
      "غير فعال",
      "3",
      "5",
      "8",
    ],
    [
      ".",
      "ضعف التواصل",
      "Noor",
      "2025-04-25",
      "8",
      "5",
      "متوسط",
      "فعال",
      "2",
      "3",
      "5",
    ],
    [
      ".",
      "قلة التدريب",
      "Zaid",
      "2025-04-30",
      "6",
      "3",
      "منخفض",
      "غير فعال",
      "1",
      "4",
      "7",
    ],
  ]);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showActionChat, setShowActionChat] = useState(false);
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
    setShowActionChat(true);
  };

  const closeActionChat = () => {
    setShowActionChat(false);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
    }
  };
  // Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const handleActionClick = (action, index) => {
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
    const actionObject = keys.reduce(
      (acc, key, i) => {
        acc[key] = action[i] || "";
        return acc;
      },
      { index }
    );

    setSelectedAction(actionObject);
    setIsEditModalOpen(true);
  };
  const handleSaveAction = (updatedAction) => {
    if (typeof updatedAction.index !== "number") {
      setData((prevData) => [
        ...prevData,
        [
          updatedAction.code,
          updatedAction.title,
          updatedAction.owner,
          updatedAction.endDate,
          updatedAction.importance,
          updatedAction.status,
          updatedAction.result,
          updatedAction.highlight,
          updatedAction.description,
          updatedAction.plan,
          updatedAction.causeDescription,
        ],
      ]);
    } else {
      setData((prevData) =>
        prevData.map((risk, index) =>
          index === updatedAction.index
            ? [
                updatedAction.code,
                updatedAction.title,
                updatedAction.owner,
                updatedAction.endDate,
                updatedAction.importance,
                updatedAction.status,
                updatedAction.result,
                updatedAction.highlight,
                updatedAction.description,
                updatedAction.plan,
                updatedAction.causeDescription,
              ]
            : risk
        )
      );
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="main-container-action-center">
      {/* Header */}
      <div className="header-action-center">
        {/* I */}
        <div className="first-header-action-center">
          <PiSquaresFourBold
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">مشروع اختبار جديد مدثر</p>
        </div>
        {/* II */}
        <div>
          <button
            className="add-modal-button fs-md fw-600 lh-1-2"
            onClick={() => {
              setSelectedAction({
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
            <p>نافذة الإجراء</p>
          </button>
        </div>
      </div>
      {/* Section-I */}
      {/* Search & Filter Buttons */}
      <section className="section-I-action-center">
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
          onEdit={(index) => handleActionClick(data[index], index)}
        />
        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteIndex !== null}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIndex(null)}
        />
        {/* Chat Modal */}
        <ChatModal
          isOpen={showActionChat}
          onClose={closeActionChat}
          messages={chatMessages}
          currentMessage={currentMessage}
          onSendMessage={handleSendMessage}
          setCurrentMessage={setCurrentMessage}
        />
        {/* Edit Modal */}
        {isEditModalOpen && (
          <ActionModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            actionData={selectedAction}
            onSave={handleSaveAction}
          />
        )}
      </div>
    </div>
  );
};

export default ActionCenter;
