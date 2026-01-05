import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdPlayLesson } from "react-icons/md";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import Table from "../../components/table/Table";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import LessonModal from "../../modals/lesson-modal/LessonModal";
import "./lessoncenter.scss";

const LessonLearnedCenter = () => {
  const { theme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const allColumns = [
    "العنوان",
    "ما الذي حصل",
    "كيف تم التعامل مع الموقف",
    "الدروس المستفادة",
    "المجال",
    "أبرز التحديات ",
    "التاريخ",
  ];
  const displayedColumns = allColumns.slice(0, 4);
  const [data, setData] = useState([
    [
      "التأكد من ميزانية المشروع بداية كل سنة",
      "الموازنة متغيرة ولم يتم استيعابها حسب الحاجة لسداد الجوائز",
      "تمت مراجعة الميزانية وإجراء التعديلات اللازمة لتغطية الجوائز",
      "ضرورة التأكد من الميزانية السنوية مسبقًا لضمان تغطية التكاليف",
      "الإدارة المالية",
      "تغير الميزانية وتأثيرها على الإنفاق المخطط",
      "12/02/2024",
    ],
    [
      "إعطاء مسؤولية التحضير للمشروع للجهة المصممة",
      "الحاجة ممكن أن تتغير مما يؤثر على الحجز المبكر للمبالغ",
      "تم الاتفاق مع الجهة المصممة على متابعة جميع التغييرات",
      "تفويض الجهة المصممة يساهم في تجنب التغييرات المتأخرة",
      "إدارة المشاريع",
      "تغيير المتطلبات خلال مراحل المشروع المختلفة",
      "29/09/2024",
    ],
    [
      "التأكد من الموافقة واعتماد المشروع",
      "تم تعديل المخططات الأولية بعد اعتماد المشروع",
      "تم فرض إجراءات أكثر صرامة لمراجعة المخططات قبل الاعتماد",
      "يجب التأكد من الموافقة الداخلية قبل إعداد المخططات النهائية",
      "الهندسة المدنية",
      "التغييرات المتأخرة تؤثر على الجدول الزمني والتنفيذ",
      "29/09/2024",
    ],
  ]);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showLessonChat, setShowLessonChat] = useState(false);
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
    setShowLessonChat(true);
  };

  const closeLessonChat = () => {
    setShowLessonChat(false);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
    }
  };
  // Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const handleLessonClick = (lesson, index) => {
    const keys = [
      "title",
      "whatHappened",
      "handling",
      "lessonsLearned",
      "field",
      "challenges",
      "date",
    ];

    const lessonObject = keys.reduce(
      (acc, key, i) => {
        acc[key] = lesson[i] || "";
        return acc;
      },
      { index }
    );

    setSelectedLesson(lessonObject);
    setIsEditModalOpen(true);
  };

  const handleSaveLesson = (updatedLesson) => {
    if (typeof updatedLesson.index !== "number") {
      setData((prevData) => [
        ...prevData,
        [
          updatedLesson.title,
          updatedLesson.whatHappened,
          updatedLesson.handling,
          updatedLesson.lessonsLearned,
          updatedLesson.field,
          updatedLesson.challenges,
          updatedLesson.date,
        ],
      ]);
    } else {
      setData((prevData) =>
        prevData.map((lesson, index) =>
          index === updatedLesson.index
            ? [
                updatedLesson.title,
                updatedLesson.whatHappened,
                updatedLesson.handling,
                updatedLesson.lessonsLearned,
                updatedLesson.field,
                updatedLesson.challenges,
                updatedLesson.date,
              ]
            : lesson
        )
      );
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="main-container-lesson-center">
      {/* Header */}
      <div className="header-lesson-center">
        {/* I */}
        <div className="first-header-lesson-center">
          <MdPlayLesson
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            الدروس المستفادة - حوكمة وإدارة وتشغيل مكتب إدارة البيانات
          </p>
        </div>
        {/* II */}
        <div>
          <button
            className="add-modal-button fs-md fw-600 lh-1-2"
            onClick={() => {
              setSelectedLesson({
                title: "",
                whatHappened: "",
                handling: "",
                lessonsLearned: "",
                field: "",
                challenges: "",
                date: "",
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
            <p>نافذة الدروس المستفادة</p>
          </button>
        </div>
      </div>
      {/* Section-I */}
      {/* Search & Filter Buttons */}
      <section className="section-I-lesson-center">
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
        filterLabels={[
          "العنوان",
          "ما الذي حصل؟",
          "الدروس المستفادة / التوصيات",
          "التاريخ",
        ]}
      />
      <div className="table-Risk-Center">
        <Table
          columns={displayedColumns}
          data={data}
          displayedData={data.map((row) => row.slice(0, 4))}
          onDelete={handleDeleteClick}
          onChat={handleChatClick}
          onEdit={(index) => handleLessonClick(data[index], index)}
        />
        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteIndex !== null}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIndex(null)}
        />
        {/* Chat Modal */}
        <ChatModal
          isOpen={showLessonChat}
          onClose={closeLessonChat}
          messages={chatMessages}
          currentMessage={currentMessage}
          onSendMessage={handleSendMessage}
          setCurrentMessage={setCurrentMessage}
        />
        {/* Edit Modal */}
        {isEditModalOpen && (
          <LessonModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            lessonData={selectedLesson}
            onSave={handleSaveLesson}
          />
        )}
      </div>
    </div>
  );
};

export default LessonLearnedCenter;
