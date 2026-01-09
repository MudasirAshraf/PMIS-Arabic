import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { MdEdit } from "react-icons/md";
import { TfiLayoutGrid2Thumb } from "react-icons/tfi";
import { AiOutlineSearch } from "react-icons/ai";
import CompetitionTable from "../../components/competition-table/CompetitionTable";
import CompetitionModal from "../../modals/competition-modal/CompetitionModal";
import "./competitions.scss";

const Competitions = () => {
  const { theme } = useTheme();
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCount, setFilteredCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [competitions, setCompetitions] = useState([
    {
      competition: "ترجمة وثائق ومراسلاتها",
      sector: "الشؤون التنظيمية / الالتزام",
      date: "الربع الرابع",
      year: "2025",
      budget: "50,000",
      requester: "وليد النعيم (Waleed Alnaim)",
      method: "شراء مباشر",
      type: "تشغيلي / أعمال",
      function: "ترجمة وثائق ومراسلاتها",
      location: "الرياض",
      description: "ترجمة وثائق ومراجعتها",
      notes: "قيد سير العمل مع (عبدالله العثمان)",
    },
    {
      competition: "تحليل البيانات والأنظمة المالية الخاصة",
      sector: "الشؤون التنظيمية / الالتزام",
      date: "الربع الرابع",
      year: "2025",
      budget: "496,800",
      requester: "وليد النعيم (Waleed Alnaim)",
      method: "اتفاقية إطارية",
      type: "تشغيلي / رأسمالي",
      function: "إدارية مالية",
      location: "الرياض",
      description: "تحليل البيانات والأنظمة المالية الخاصة",
      notes: "قيد سير العمل مع (عبدالله العثمان)",
    },
    {
      competition: "منافسة حجز وتجهيز مواقع إقامة رسمية وخدمات استضافة للضيوف",
      sector: "إدارة العمليات للعلاقات العامة",
      date: "الربع الأول",
      year: "2025",
      budget: "206,000",
      requester: "محمد عواجي",
      method: "منافسة عامة",
      type: "استراتيجي",
      function: "إقامة وإشراف عام",
      location: "مكة المكرمة",
      description:
        "منافسة حجز وتجهيز مواقع إقامة رسمية وخدمات استضافة للضيوف، وفقاً للنموذج (ب)",
      notes: "مكتمل",
    },
  ]);

  const handlePriorityFilter = (type) => setFilterType(type);

  return (
    <div className="main-container-competitions-II">
      {/* Header */}
      <div className="competition-header">
        <div className="sub-header-competition">
          <TfiLayoutGrid2Thumb
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">المنافسات</p>
        </div>

        <div className="header-button-risk-center">
          <button 
            className="add-modal-button fs-md fw-600 lh-1-2"
            onClick={() => setShowModal(true)}
          >
            <MdEdit
              size={17}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p> إضافة المنافسة</p>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="container-search-length">
        <p className="search-para fs-md fw-700 lh-1-2">
          جميع المنافسات
          <span className="search-span fs-sm fw-700 lh-1">{filteredCount}</span>
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="ابحث..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="competition-filter-container">
        {["", "إسهامي / تشغيلي", "متكرر", "استراتيجي", "تشغيلي"].map(
          (type, i) => (
            <button
              key={i}
              className={`query-btn fs-md fw-700 lh-1 ${
                filterType === type ? "active" : ""
              }`}
              onClick={() => handlePriorityFilter(type)}
            >
              {type === "" ? "الكل" : type}
            </button>
          )
        )}
      </div>

      {/* Modal */}
      {/* {showModal && (
        <CompetitionModalII
          close={() => setShowModal(false)}
          competitions={competitions}
          onSave={(newCompetition) => {
            setCompetitions((prev) => [...prev, newCompetition]);
            setShowModal(false);
          }}
        />
      )} */}

      {showModal && (
        <CompetitionModal
          close={() => setShowModal(false)}
          competitions={competitions}
          onSave={(newCompetition, shouldClose = true) => {
            setCompetitions((prev) => [...prev, newCompetition]);

            if (shouldClose) {
              setShowModal(false);
            }
          }}
        />
      )}

      {/* Table */}
      <CompetitionTable
        filterType={filterType}
        searchQuery={searchQuery}
        onCountChange={setFilteredCount}
        data={competitions}
      />
    </div>
  );
};

export default Competitions;
