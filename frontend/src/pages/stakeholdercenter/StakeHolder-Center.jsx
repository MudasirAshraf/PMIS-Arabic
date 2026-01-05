import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GrStakeholder } from "react-icons/gr";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import Table from "../../components/table/Table";
import StakeModal from "../../modals/stake-modal/StakeModal";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import "./stakeholdercen.scss";

const StakeHolderCenter = () => {
  const { theme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const allColumns = [
    "الاسم",  "البريد الإلكتروني", "رقم الجوال",   "درجة الاهتمام",   "درجة التأثير",   "التقييم",   "المسؤوليات",   "الحالة", ];
  const displayedColumns = allColumns.slice(0, 5);
  const [data, setData] = useState([
    [ "رجاء الحجي","d.aljuhinni@awqaf.gov.sa", "-", "6", "6", "شخصية مهمة جدًا", "-", "فعال",],
    [ "سليمان المسند","s.almesned@awqaf.gov.sa","-","10","10","شخصية مهمة جدًا","-","فعال",],
    ["عمر العلي","o.alali@awqaf.gov.sa","0566722221","10","10","شخصية مهمة جدًا","-","غير فعال",],
    ["عمر المحمود","oalmohammed@edm.sa","0555888975","10","10","شخصية مهمة جدًا","-","فعال", ],
    [  "محمد جويش",  "mohamed.gawesh@dataplusbiz.com",  "-",  "10",  "10",  "شخصية مهمة جدًا",  "-",  "غير فعال",],
    [ "عاطف سليمان", "atef.soliman@dataplusbiz.com", "0561373056", "7", "7", "شخصية مهمة جدًا", "-", "فعال",],
  ]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showStakeChat, setShowStakeChat] = useState(false);
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
  // Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);
  const handleStakeClick = (stake, index) => {
    const keys = [
      "name",
      "email",
      "phone",
      "interestLevel",
      "impactLevel",
      "evaluation",
      "responsibilities",
      "status",
    ];
    const stakeObject = keys.reduce(
      (acc, key, i) => {
        acc[key] = stake[i] || "";
        return acc;
      },
      { index }
    );

    setSelectedStake(stakeObject);
    setIsEditModalOpen(true);
  };

  const handleSaveStake = (updatedStake) => {
    if (typeof updatedStake.index !== "number") {
      setData((prevData) => [
        ...prevData,
        [
          updatedStake.name,
          updatedStake.email,
          updatedStake.phone,
          updatedStake.interestLevel,
          updatedStake.impactLevel,
          updatedStake.evaluation,
          updatedStake.responsibilities,
          updatedStake.status,
        ],
      ]);
    } else {
      setData((prevData) =>
        prevData.map((stake, index) =>
          index === updatedStake.index
            ? [
                updatedStake.name,
                updatedStake.email,
                updatedStake.phone,
                updatedStake.interestLevel,
                updatedStake.impactLevel,
                updatedStake.evaluation,
                updatedStake.responsibilities,
                updatedStake.status,
              ]
            : stake
        )
      );
    }
    setIsEditModalOpen(false);
  };
  

  return (
    <div className="main-container-stakeholder-center">
      {/* Header */}
      <div className="header-stake-center">
        {/* I */}
        <div className="first-header-stake-center">
          <GrStakeholder
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">أصحاب المصلحة - حوكمة وإدارة وتشغيل مكتب إدارة البيانات</p>
        </div>
        {/* II */}
        <div>
        <button
        className="add-modal-button fs-md fw-600 lh-1-2"
  onClick={() => {
    setSelectedStake({
      name: "",
      email: "",
      phone: "",
      interestLevel: "",
      impactLevel: "",
      evaluation: "",
      responsibilities: "",
      status: "",
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
  <p>نافذة أصحاب المصلحة</p>
</button>
        </div>
      </div>
      {/* Section-I */}
      {/* Search & Filter Buttons */}
      <section className="section-I-stake-center">
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
      <div className="table-Risk-Center">
        <Table
          columns={displayedColumns}
          data={data}
          displayedData={data.map((row) => row.slice(0, 5))}
          onDelete={handleDeleteClick}
          onChat={handleChatClick}
          onEdit={(index) => handleStakeClick(data[index], index)}
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
        {/* Edit Modal */}
        {isEditModalOpen && (
          <StakeModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            stakeData={selectedStake}
            onSave={handleSaveStake}
          />
        )}
      </div>
    </div>
  );
};

export default StakeHolderCenter;
