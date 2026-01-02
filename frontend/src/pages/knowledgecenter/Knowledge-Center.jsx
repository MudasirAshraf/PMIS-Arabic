import React, { useState, useEffect } from "react";
import { FaMoneyBill, FaClipboardCheck, FaUsers } from 'react-icons/fa';
import DashboardCard from "../../cards/dashboardcard/dashboard-card";
import { useNavigate } from "react-router-dom";
import EventCard from "../../cards/eventcard/event-card";
import { IoDocumentSharp } from "react-icons/io5";
import ModalIII from "../../modals/modal-III/Modal-III";
import ModalIV from "../../modals/modal-IV/Modal-IV";
import ModalV from "../../modals/modal-V/Modal-V";
import { RiFolderVideoLine } from "react-icons/ri";
import { RiArticleFill } from "react-icons/ri";
import "./knowledgecenter.scss";

const KnowledgeCenter = () => {
  const Navigate = useNavigate();
  const handleVideoCenter = () => {
    Navigate("/Video-Center")
  }

  const handleDocumentCenter = () => {
    Navigate("/Document-Center");
  }

  const handleArticleCenter = () => {
    Navigate("/Article-Center");
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  useEffect(() => {
    if (isManual) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 11250);

    return () => clearInterval(interval);
  }, [isManual]);

  //  manual click
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setIsManual(true);
    setTimeout(() => {
      setIsManual(false);
    }, 1000);
  };
  // Objevtive Card Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Event Card Modal
  const [modalOpen, setModalOpen] = useState(false);
  const Modalopen = () => setModalOpen(true);
  const Modalclose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  const events = [
    { date: "5", title: "ورشة عمل حول التخطيط الاستراتيجي " },
    { date: "8", title: "ندوة عن التحول الرقمي" },
    { date: "6", title: "محاضرة عن إدارة المخاطر" },
    { date: "4", title: "دورة تدريبية في تحليل البيانات" },
    { date: "23", title: "مؤتمر الابتكار والتكنولوجيا" },
    { date: "16", title: "جلسة حوارية حول القيادة الفعالة" },
    { date: "5", title: "ورشة عمل حول التخطيط الاستراتيجي " },
    { date: "8", title: "ندوة عن التحول الرقمي" },
    { date: "6", title: "محاضرة عن إدارة المخاطر" },
    { date: "4", title: "دورة تدريبية في تحليل البيانات" },
    { date: "23", title: "مؤتمر الابتكار والتكنولوجيا" },
    { date: "16", title: "جلسة حوارية حول القيادة الفعالة" },
  ];
  // Modal V
  const [modalVOpen, setModalVOpen] = useState(false);
  const openModalV = () => setModalVOpen(true);
  const closeModalV = () => setModalVOpen(false);

  return (
    <div className="main-container-HomePage">
      {/* first Section */}
      <section className="section-I-Homepage">
        {/* Ist */}
        <div className="first-section-homepage">
          <p className="section-paragraph-i fs-xl fw-700 lh-1-3 text-start">
            مركز المعرفة - بوابتك لتطوير إدارة المشاريع
          </p>
          <div className="second-paragraphs-container">
            <p className="fs-sm fw-700 lh-1-2 text-start">
              مرحبًا بكم في مركز المعرفة، حيث يمكنكم الوصول إلى أحدث الموارد
              والمعلومات لدعم رحلتكم في إدارة المشاريع.
            </p>
          </div>
        </div>
        {/* Second  */}
        <div className="second-section-homepage">
          {/* Header */}
          <p className="section-i-paragraph-i fs-xl fw-700 lh-1-3 text-start">
            الفعاليات<span className="span-paragraph-i fs-xs fw-700 text-start">(مارس 2025)</span>
          </p>
          <div className="scroll-event-container">
            <div className="scroll-content">
              {events.map((event, index) => (
                <EventCard
                  key={index}
                  date={event.date}
                  title={event.title}
                  onClick={() => {
                    setSelectedEvent(event);
                    Modalopen();
                  }}
                />
              ))}
            </div>
          </div>
          <div className="homepage-btn-I">
            <button className="event-button" onClick={openModalV}>المزيد</button>
          </div>
        </div>
      </section>
      {/* Second-Section */}
      <section>
  <div className="Section-II-Homepage-container">
    <DashboardCard icon={<FaMoneyBill />} title="الميزانية" value={353} />
    <DashboardCard icon={<FaClipboardCheck />} title="المشاريع المنجزة" value={230} />
    <DashboardCard icon={<FaUsers/>} title="العملاء" value={200} />
  </div>
</section>
      {/* Third Section */}
      <section className="Section-III-Homepage">
        <div className="outlet-container">
          {/* First Card */}
          <div
              className="multimedia-card"
            isActive={activeIndex === 0}
            onClick={() => handleCardClick(0)}
          >
            <p className="fs-xl fw-700 lh-1 text-start">فيديوهات</p>
            <div className="outlet-I-Container">
              <RiFolderVideoLine
                size={190}
                color="#484A6E"
                className="v-icon"
                onClick={handleVideoCenter}
              />
            </div>
          </div>
          {/* Second Card */}
          <div
              className="multimedia-card"
            isActive={activeIndex === 1}
            onClick={() => handleCardClick(1)}
          >
            <p className="fs-xl fw-700 lh-1 text-start">مقالات</p>
            <div className="outlet-II-Container">
              <IoDocumentSharp size={170} color="#484A6E" className="v-icon" onClick={handleDocumentCenter}/>
            </div>
          </div>
          {/* Third Card */}
          <div
          className="multimedia-card"
            isActive={activeIndex === 2}
            onClick={() => handleCardClick(2)}
          >
            <p className="fs-xl fw-700 lh-1 text-start">مستندات</p>
            <div className="outlet-III-Container">
              <RiArticleFill size={190} color="#484A6E" className="v-icon" onClick={handleArticleCenter} />
            </div>
          </div>
        </div>
      </section>
      {/* Modal for Service Card */}
      {isModalOpen && <ModalIII closeModal={closeModal} />}
      {/* ModalIV for Event Details */}
      {modalOpen && <ModalIV closeModal={Modalclose} event={selectedEvent} />}
      {/* ModalV for Event List */}
      {modalVOpen && (
        <ModalV
          events={events}
          closeModal={closeModalV}
          onEventClick={openModalV}
        />
      )}
    </div>
  );
};

export default KnowledgeCenter;
