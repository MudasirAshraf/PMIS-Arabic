import React, { useState, useEffect } from "react";
import { FaMoneyBill, FaClipboardCheck, FaUsers } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import EventCard from "../../cards/eventcard/event-card";
import OutletCard from "../../cards/outletcard/outlet-card";
import ObjectiveCard from "../../cards/objectivecard/objective-card";
import ServiceCardI from "../../cards/servicecard-I/service-card-i";
import ModalIII from "../../modals/modal-III/Modal-III";
import ModalIV from "../../modals/modal-IV/Modal-IV";
import ModalV from "../../modals/modal-V/Modal-V";
import ServiceModal from "../../modals/servicemodal/service-modal";
import DashboardCard from "../../cards/dashboardcard/dashboard-card";
import "./landingpage.scss";

const LandingPage = () => {
  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation("/Homepage");
  };
  const handleNavigate = () => {
    navigation("/Knowledge-Center");
  };
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
  //Service Card Modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceModalTitle, setServiceModalTitle] = useState("");
  const [serviceModalData, setServiceModalData] = useState({
    data: [],
    columns: [],
  });

  const serviceCardData = {
    "دروس مستفادة": {
      data: Array.from({ length: 50 }, (_, i) => ({
        التصنيف: ["المبادرة", "التخطيط", "التنفيذ", "الإغلاق"][i % 4],
        عنوان: `Lesson ${i + 1}`,
        المستفاد: `Benefit ${i + 1}`,
        "الدرس المستفاد": `Lesson Learned ${i + 1}`,
        التحدي: `Challenge ${i + 1}`,
        الحلول: `Solution ${i + 1}`,
        النتائج: `Result ${i + 1}`,
        "تاريخ رصد الدرس": `2025-03-${(i % 28) + 1}`,
        "دروس ذات صلة": `Related Lesson ${i + 1}`,
      })),
      columns: [
        "عنوان",
        "المستفاد",
        "التصنيف",
        "الدرس المستفاد",
        "التحدي",
        "الحلول",
        "النتائج",
        "تاريخ رصد الدرس",
        "دروس ذات صلة",
      ],
      filterColumn: "التصنيف",
      dropdownOptions: ["المبادرة", "التخطيط", "التنفيذ", "الإغلاق"],
    },
    مشاريع: {
      data: Array.from({ length: 50 }, (_, i) => ({
        "اسم المشروع": `Project ${i + 1}`,
        "اسم المخرج": `Output ${i + 1}`,
        "تصنيف المخرج": ["ألفا", "بيتا", "تشارلي"][i % 3],
        "التصنيف الفرعي": `تصنيف ${(i % 7) + 1}`,
        البدء: `2025-03-${(i % 28) + 1}`,
        الانهاء: `2025-04-${(i % 28) + 1}`,
        الكمية: `${(i % 10) + 1}`,
        المدة: `${(i % 20) + 1} days`,
        التكلفة: `$${(i % 200) + 50}`,
        المراجع: `Reference ${i + 1}`,
      })),
      columns: [
        "اسم المشروع",
        "اسم المخرج",
        "تصنيف المخرج",
        "التصنيف الفرعي",
        "البدء",
        "الانهاء",
        "الكمية",
        "المدة",
        "التكلفة",
        "المراجع",
      ],
      filterColumn: "تصنيف المخرج",
      dropdownOptions: ["ألفا", "بيتا", "تشارلي"],
      subFilterColumn: "التصنيف الفرعي",
      subFilterOptions: ["تصنيف 1", "تصنيف 2", "تصنيف 3", "تصنيف 4", "تصنيف 5", "تصنيف 6", "تصنيف 7"],
    },
  };
  // Calculate Counts
  const getDataCounts = (data, filterColumn) => {
    return data.reduce((acc, row) => {
      const key = row[filterColumn];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const dataCounts = serviceModalData?.data
    ? getDataCounts(serviceModalData.data, serviceModalData.filterColumn)
    : {};


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
     {/* {user && (
    <div className="welcome-message">
      مرحباً {user.name} ({user.email})
    </div>
  )} */}
      {/* first Section */}
      <section className="section-I-Homepage">
        {/* Ist */}
        <div className="first-section-homepage">
      <p className="section-paragraph-i fs-xl fw-700 lh-1-3 text-start">
  مكتب ادارة المشاريع ترحب بكم
</p>
          <div className="second-paragraphs-container">
            <p className="fs-sm fw-700 lh-1-2 text-start">
              النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى معين
              في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة العربية التي تعبر
              عن محتوى معين في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة
              العربية التي تعبر عن محتوى معين في هذه الفقرة.
            </p>
             <p className="fs-sm fw-700 lh-1-2 text-start">
              النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى معين
              في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة العربية التي تعبر
              عن محتوى معين في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة
              العربية التي تعبر عن محتوى معين في هذه الفقرة.
            </p>
          <p className="fs-sm fw-700 lh-1-2 text-start">
              النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى معين
              في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة العربية التي تعبر
              عن محتوى معين في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة
              العربية التي تعبر عن محتوى معين في هذه الفقرة.
            </p>
            <p className="fs-sm fw-700 lh-1-2 text-start">
              النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى معين
              في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة العربية التي تعبر
              عن محتوى معين في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة
              العربية التي تعبر عن محتوى معين في هذه الفقرة.
            </p>
             <p className="fs-sm fw-700 lh-1-2 text-start">
              النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى معين
              في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة العربية التي تعبر
              عن محتوى معين في هذه الفقرة. النص الأول هنا. بعض النصوص باللغة
              العربية التي تعبر عن محتوى معين في هذه الفقرة.
            </p>
          </div>
        </div>
        {/* Second  */}
        <div className="second-section-homepage">
          {/* Header */}
         <p className="section-i-paragraph-i fs-xl fw-700 lh-1-3 text-start">
  الفعاليات
  <span className="span-paragraph-i fs-xs fw-700 text-start">
    (مارس 2025)
  </span>
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
          <OutletCard
            title="رؤية مكتب ادارة المشاريع"
            isActive={activeIndex === 0}
            onClick={() => handleCardClick(0)}
          >
            <div className="outlet-I">
            <p className="fw-700 fs-sm lh-1 text-start">

                النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                معين في هذه الفقرة.
              </p>
             <p className="fw-700 fs-sm lh-1 text-start">

                النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                معين في هذه الفقرة.
              </p>
           <p className="fw-700 fs-sm lh-1 text-start">

                النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                معين في هذه الفقرة.
              </p>
            <p className="fw-700 fs-sm lh-1 text-start">

                النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                معين في هذه الفقرة.
              </p>
             <p className="fw-700 fs-sm lh-1 text-start">
                النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                معين في هذه الفقرة.
              </p>
            </div>
          </OutletCard>
          {/* Third Card */}
          <OutletCard
            title="خدماتنا"
            isActive={activeIndex === 1}
            onClick={() => handleCardClick(1)}
          >
            <div className="outlet-II">
              <ServiceCardI
                title="دروس مستفادة"
                onClick={() => {
                  const serviceData = serviceCardData["دروس مستفادة"];
                  setServiceModalTitle("دروس مستفادة");
                  setServiceModalData(serviceData);
                  setServiceModalOpen(true);
                }}
              />
              <ServiceCardI
                title="مشاريع"
                onClick={() => {
                  const serviceData = serviceCardData["مشاريع"];
                  setServiceModalTitle("مشاريع");
                  setServiceModalData({
                    ...serviceData,
                    filterColumn: "تصنيف المخرج",
                    subFilterColumn: "التصنيف الفرعي",
                    subFilterOptions: [
                      "تصنيف 1",
                      "تصنيف 2",
                      "تصنيف 3",
                      "تصنيف 4",
                      "تصنيف 5",
                      "تصنيف 6",
                      "تصنيف 7",
                    ],
                  });
                  setServiceModalOpen(true);
                }}
              />
              <ServiceCardI title="مفاهيم هامة" onClick={handleNavigate} />
            </div>
          </OutletCard>
          {/* Second Card */}
          <OutletCard
            title="أهداف مكتب ادارة المشاريع"
            isActive={activeIndex === 2}
            onClick={() => handleCardClick(2)}
          >
            <div className="outlet-II">
              <ObjectiveCard title="الركائز" value="4" onClick={openModal} />
              <ObjectiveCard title="الركائز" value="4" onClick={openModal} />
              <ObjectiveCard title="الركائز" value="4" onClick={openModal} />
            </div>
          </OutletCard>
          {/* Second Card */}
          <OutletCard
            title="أهداف مكتب ادارة المشاريع"
            isActive={activeIndex === 3}
            onClick={() => handleCardClick(3)}
          >
            <div className="outlet-II">
              <ObjectiveCard title="الركائز" value="4" onClick={openModal} />
              <ObjectiveCard title="الركائز" value="4" onClick={openModal} />
              <ObjectiveCard title="الركائز" value="4" onClick={openModal} />
            </div>
          </OutletCard>
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
      {/* Service-Card Modal */}
      <ServiceModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        data={serviceModalData?.data || []}
        columns={serviceModalData?.columns || []}
        title={serviceModalTitle}
        dropdownOptions={serviceModalData?.dropdownOptions || []}
        filterColumn={serviceModalData?.filterColumn || "التصنيف"}
        subFilterColumn={serviceModalData?.subFilterColumn}
        subFilterOptions={serviceModalData?.subFilterOptions || []}
        dataCounts={dataCounts}
      />
      {/* Section-IV */}
      <div className="section-iv-hp">
        <button className="homepage-button" onClick={handleNavigation}>بوابة المشاريع</button>
      </div>
    </div>
  );
};

export default LandingPage;
