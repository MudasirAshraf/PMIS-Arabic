import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Table from "../table/Table";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import RequestStakeModal from "../../modals/requeststake-modal/RequestStakeModal";
import "./requeststakeholder.scss";

const RequestStakeHolders = ({ goToPreviousTab }) => {
  const allColumns = [
    "الاسم",
    "المسمى الوظيفي",
    "الدور والمسؤوليات بالمشروع",
    "النوع",
  ];
  const displayedColumns = allColumns.slice(0, 3);

  const [data, setData] = useState([
    [
      "رجاء الحجي",
      "r.alhajji@awqaf.gov.sa",
      "شخصية مهمة جدًا",
      "داخلي",
      "فعال",
    ],
    ["سعاد القرني", "s.qarni@awqaf.gov.sa", "خبير خارجي", "خارجي", "غير فعال"],
    ["عبدالله التميمي", "a.tamimi@awqaf.gov.sa", "مدير مشروع", "داخلي", "فعال"],
    ["نورة العتيبي", "n.otaibi@awqaf.gov.sa", "مستشار قانوني", "خارجي", "فعال"],
    [
      "فيصل الشهري",
      "f.shahri@awqaf.gov.sa",
      "محلل مخاطر",
      "داخلي",
      "تحت المراجعة",
    ],
  ]);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showStakeChat, setShowStakeChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStakeholder, setCurrentStakeholder] = useState([
    "",
    "",
    "",
    "",
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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

  // Add New
  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentStakeholder(["", "", "", ""]);
    setIsModalOpen(true);
  };

  const handleEditClick = (index) => {
    setIsEditMode(true);
    setCurrentStakeholder(data[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveStakeholder = () => {
    if (isEditMode) {
      const updatedData = [...data];
      updatedData[editIndex] = currentStakeholder;
      setData(updatedData);
    } else {
      setData([...data, currentStakeholder]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="container-request-stake-holder">
        <div
          className="header-request-stake-holder"
          onClick={handleAddClick}
          style={{ cursor: "pointer" }}
        >
          <IoMdAdd className="stake-holder-icon" />
          <p className="fs-md fw-700 lh-1-2">إضافة صاحب العلاقة</p>
        </div>
      </div>

      {/* Table */}

      <Table
        columns={displayedColumns}
        data={data}
        displayedData={data.map((row) => row.slice(0, 3))}
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

      {/* Stakeholder Add/Edit Modal */}
      <RequestStakeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStakeholder}
        stakeholder={currentStakeholder}
        setStakeholder={setCurrentStakeholder}
      />

      {/* Navigation Buttons */}
      <div className="shuffle-btns-container">
        {goToPreviousTab && (
          <button
            className="prev fs-md fw-600 lh-1-2"
            onClick={goToPreviousTab}
          >
            السابق
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestStakeHolders;
