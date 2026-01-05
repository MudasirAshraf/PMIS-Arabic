import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { MdEdit } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Table from "../../components/table/Table";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import EPMOModal from "../../modals/epmo-modal/EPMO-Modal";
import "./epmocenter.scss";

const EPMOCenter = () => {
  const allColumns = [
    "الرمز",
    "العنوان",
    "التصنيف",
    "الوصف",
    "تاريخ الانتهاء المتوقع",
    "تاريخ الإغلاق",
    "الأولوية",
    "الحالة",
  ];

  const displayedColumns = allColumns.slice(0, 8);
  const [data, setData] = useState([
    [
      "1",
      "لم يتم رفع مصدر بدء الأعمال",
      "الأخرى",
      "لم يتم رفع مصدر بدء الأعمال",
      "23/03/2023",
      "23/03/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
    [
      "2",
      "لم يتم رفع الجدول الزمني",
      "الأخرى",
      "لم يتم رفع المطلوب رفع الجدول الزمني",
      "21/03/2023",
      "28/02/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
    [
      "3",
      "لم يتم رفع خطة المشروع",
      "الأخرى",
      "لم يتم رفع المطلوب رفع خطة المشروع",
      "07/05/2023",
      "28/02/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
    [
      "4",
      "لم يتم التحديث على الجدول الزمني",
      "الجدول الزمني",
      "لم يتم التحديث على الجدول الزمني",
      "09/03/2023",
      "09/03/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
    [
      "5",
      "لم يتم رفع المخاطر",
      "المخاطر",
      "لم يتم رفع المخاطر",
      "24/09/2023",
      "06/04/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
    [
      "6",
      "لم يتم رفع المشاكل",
      "المشاكل",
      "لم يتم رفع المشاكل",
      "30/09/2023",
      "13/04/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
    [
      "7",
      "لم يتم تحديث التقدم على الجدول الزمني",
      "الجدول الزمني",
      "يوجد تأخر في المشروع ولم يتم تحديث الجدول الزمني",
      "30/09/2023",
      "06/08/2023",
      "عالي",
      "مكتمل",
      "2023-03-01",
    ],
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showStakeChat, setShowStakeChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isEPMOModalOpen, setIsEPMOModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [modalInitialData, setModalInitialData] = useState(null);

  // Delete
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    const newData = data
      .filter((_, i) => i !== deleteIndex)
      .map((row, index) => {
        const newRow = [...row];
        newRow[0] = (index + 1).toString();
        return newRow;
      });

    setData(newData);
    setFilteredData(newData);
    setDeleteIndex(null);
  };

  // Chat
  const handleChatClick = () => {
    setShowStakeChat(true);
  };

  const closeStakeChat = () => {
    setShowStakeChat(false);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
    }
  };
  // Filter Function
  const handlePriorityFilter = (priority) => {
    if (priority === "الكل") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((row) => row[6] === priority);
      setFilteredData(filtered);
    }
  };

  // ADD or EDIT
  const handleAddNote = () => {
    setModalMode("add");
    setModalInitialData(null);
    setIsEPMOModalOpen(true);
  };

  const formatDateForInput = (dateStr) => {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateStr;
  };

  const handleEditClick = (index) => {
    const row = data[index];
    setModalMode("edit");
    setCurrentEditIndex(index);
    setModalInitialData({
      id: row[0],
      title: row[1],
      type: row[2],
      description: row[3],
      expectedEnd: formatDateForInput(row[4]),
      closeDate: formatDateForInput(row[5]),
      priority: row[6],
      status: row[7],
      startDate: row[8] ? formatDateForInput(row[8]) : "",
    });
    setIsEPMOModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    const row = [
      formData.id,
      formData.title,
      formData.type,
      formData.description,
      formData.expectedEnd,
      formData.closeDate,
      formData.priority,
      formData.status,
      formData.startDate,
    ];

    let newData;
    if (modalMode === "edit") {
      const updated = [...data];
      updated[currentEditIndex] = row;
      newData = updated;
    } else {
      newData = [...data, row];
    }

    setData(newData);
    setFilteredData(newData);
    setIsEPMOModalOpen(false);
  };

  const { theme } = useTheme();
  return (
    <div className="main-container-epmo-center">
      {/* Header */}
      <div className="header-epmo-center">
        {/* I */}
        <div className="first-header-epmo-center">
          <MdEdit
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            ملاحظات EPMO - مشروع تطوير و تصميم منظومة الحساب الوقفي الرقمي
            "أوقاف PAY"
          </p>
        </div>
        {/* II */}
        <div>
          <button onClick={handleAddNote} className="add-modal-button fs-md fw-600 lh-1-2">
            <MdEdit
              size={17}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p>إضافة ملاحظة</p>
          </button>
        </div>
      </div>
      {/* Search-Bar && Document-Length */}
      <div className="container-search-length">
        <p className="search-para fs-md fw-700 lh-1-2">
          جميع الملاحظات
          <span className="search-span fs-sm fw-700 lh-1">{filteredData.length}</span>
        </p>

        {/* Search input and icon */}
        <div className="search-box">
          <input type="text" placeholder="ابحث..." className="search-input" />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>
      {/* Buttons */}
      <div className="epmo-buttton-container">
        <button
          className="query-btn fs-md fw-700 lh-1"
          onClick={() => handlePriorityFilter("الكل")}
        >
          الكل
        </button>
        <button
          className="query-btn fs-md fw-700 lh-1"
          onClick={() => handlePriorityFilter("عالي")}
        >
          عالي
        </button>
        <button
          className="query-btn fs-md fw-700 lh-1"
          onClick={() => handlePriorityFilter("متوسط")}
        >
          متوسط
        </button>
      </div>
      {/* Table */}
      <div className="project-stack-table-wrapper">
        <Table
          columns={displayedColumns}
          data={data}
          displayedData={filteredData.map((row) => row.slice(0, 8))}
          onDelete={handleDeleteClick}
          onChat={handleChatClick}
          onEdit={handleEditClick}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteIndex !== null}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIndex(null)}
        />

        {/* Chat Modal */}
        <ChatModal
          isOpen={showStakeChat}
          onClose={closeStakeChat}
          messages={chatMessages}
          currentMessage={currentMessage}
          onSendMessage={handleSendMessage}
          setCurrentMessage={setCurrentMessage}
        />

        {/* EPMO-Modal Add/Edit Modal */}
        <EPMOModal
          isOpen={isEPMOModalOpen}
          onClose={() => setIsEPMOModalOpen(false)}
          onSave={handleSaveModal}
          initialData={modalInitialData}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default EPMOCenter;
