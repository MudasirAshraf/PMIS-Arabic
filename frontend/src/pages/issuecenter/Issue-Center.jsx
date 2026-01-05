import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useTheme } from "../../ThemeContext";
import { FiAlertTriangle } from "react-icons/fi";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import Table from "../../components/table/Table";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import IssueModal from "../../modals/issue-modal/IssueModal";
import "./issuecenter.scss";

const IssueCenter = () => {
  const { theme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  // all columns but show only 5 in the table
  const allColumns = [
    "رمز المشكلة",
    "عنوان المشكلة",
    "مالك المشكلة",
    "تاريخ الانتهاء المتوقع",
    "وصف المشكلة",
    "خطة التعامل مع المشكلة",
    "الحالة",
    "نتيجة المشكلة",
  ];
  const displayedColumns = allColumns.slice(0, 5);

  const [data, setData] = useState([
    [".", "سوء التنسيق", "Haya", "2025-03-01", "8", "4", "عالي", "فعال"],
    [".", "سوء التنسيق", "Haya", "2025-03-01", "8", "4", "عالي", "فعال"],
    [".", "سوء التنسيق", "Haya", "2025-03-01", "8", "4", "عالي", "فعال"],
    [".", "سوء التنسيق", "Haya", "2025-03-01", "8", "4", "عالي", "فعال"],
    [".", "سوء التنسيق", "Haya", "2025-03-01", "8", "4", "عالي", "فعال"],
  ]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showIssueChat, setShowIssueChat] = useState(false);
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
    setShowIssueChat(true);
  };

  const closeIssueChat = () => {
    setShowIssueChat(false);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
    }
  };
  // Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const handleIssueClick = (issue, index) => {
    const keys = [
      "IssueCode",
      "IssueTitle",
      "IssueOwner",
      "ExpectedEndDate",
      "IssueDescription",
      "IssueHandlingPlan",
      "Status",
      "IssueResult",
    ];
    const issueObject = keys.reduce(
      (acc, key, i) => {
        acc[key] = issue[i] || "";
        return acc;
      },
      { index }
    );

    setSelectedIssue(issueObject);
    setIsEditModalOpen(true);
  };

  const handleSaveIssue = (updatedIssue) => {
    if (typeof updatedIssue.index !== "number") {
      // Add new record
      setData((prevData) => [
        ...prevData,
        [
          updatedIssue.IssueCode,
          updatedIssue.IssueTitle,
          updatedIssue.IssueOwner,
          updatedIssue.ExpectedEndDate,
          updatedIssue.IssueDescription,
          updatedIssue.IssueHandlingPlan,
          updatedIssue.Status,
          updatedIssue.IssueResult,
        ],
      ]);
    } else {
      // Update existing record
      setData((prevData) =>
        prevData.map((issue, index) =>
          index === updatedIssue.index
            ? [
                updatedIssue.IssueCode,
                updatedIssue.IssueTitle,
                updatedIssue.IssueOwner,
                updatedIssue.ExpectedEndDate,
                updatedIssue.IssueDescription,
                updatedIssue.IssueHandlingPlan,
                updatedIssue.Status,
                updatedIssue.IssueResult,
              ]
            : issue
        )
      );
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="main-container-Issue-Center">
      {/* Header */}
      <div className="header-issue-center">
        {/* I */}
        <div className="first-header-issue-center">
          <FiAlertTriangle
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
              setSelectedIssue({
                IssueCode: "",
                IssueTitle: "",
                IssueOwner: "",
                ExpectedEndDate: "",
                IssueDescription: "",
                IssueHandlingPlan: "",
                Status: "",
                IssueResult: "",
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
            <p>نافذة القضية</p>
          </button>
        </div>
      </div>
      {/* Section-I */}
      {/* Search & Filter Buttons */}
      <section className="section-I-issue-center">
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
        filterLabels={["الفئة", "الحالة", "المصدر", "التوقيت"]}
      />
      {/* Section-II */}
      <div className="table-Risk-Center">
        <Table
          columns={displayedColumns}
          data={data}
          displayedData={data.map((row) => row.slice(0, 5))}
          onDelete={handleDeleteClick}
          onChat={handleChatClick}
          onEdit={(index) => handleIssueClick(data[index], index)}
        />
        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteIndex !== null}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIndex(null)}
        />
        {/* Chat Modal */}
        <ChatModal
          isOpen={showIssueChat}
          onClose={closeIssueChat}
          messages={chatMessages}
          currentMessage={currentMessage}
          onSendMessage={handleSendMessage}
          setCurrentMessage={setCurrentMessage}
        />
        {/* Edit Modal */}
        {isEditModalOpen && (
          <IssueModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            issueData={selectedIssue}
            onSave={handleSaveIssue}
          />
        )}
      </div>
    </div>
  );
};

export default IssueCenter;
