import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import ProjectStatusCard from "../../cards/projectstatuscard/project-status-card";
import MGreen from "../../assets/svg/message-green.svg";
import MWhite from "../../assets/svg/message-white.svg";
import Modal from "../../modals/modal/Modal";
import "./projectstatus.scss";


const ProjectStatus = () => {
  const { theme } = useTheme();
  const [modalData, setModalData] = useState(null);

  const handleCardClick = (cardTitle, cardValue, cardType) => {
    setModalData({
      title: cardTitle,
      value: cardValue,
      type: cardType,
      columns: ["اسم المشروع", "الإدارة", "الانحراف", "مدير المشروع"],
      rows: [
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2022`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2023`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" },
        { projectName: `مشروع ${cardTitle} لسنة 2024`, department: "الخدمات المؤسسية / تقنية المعلومات", supervision: "25%", manager: "عبد الرحمن  عبد الجبار الرفاعي" }
      ]
    });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const getRowClass = (type) => {
    switch (type) {
      case "card1": return "card1-row";
      case "card2": return "card2-row";
      case "card3": return "card3-row";
      case "card4": return "card4-row";
      case "card5": return "card5-row";
      default: return "default-row";
    }
  };

  return (
    <div className="main-container-section-IV">
      <div className="first-container-section-IV">
        <img src={theme === "green" ? MGreen : theme === "light" ? MWhite : MGreen} alt="logo" />
        <p className="fs-md fw-600">حالة المشاريع في التحضير</p>
      </div>

      <div className="second-container-section-IV">
        {[{ title: "حسب الخطة", value: "10", type: "card1" }, 
          { title: "متأخر", value: "7", type: "card2" }, 
          { title: "متأخر جدا", value: "5", type: "card3" }, 
          { title: "مكتمل", value: "3", type: "card4" }, 
          { title: "ملغي", value: "1", type: "card5" }]
          .map((card) => (
            <ProjectStatusCard
              key={card.type}
              title={card.title}
              value={card.value}
              theme={theme}
              type={card.type}
              onClick={() => handleCardClick(card.title, card.value, card.type)}
            />
          ))}
      </div>

      {modalData && <Modal modalData={modalData} closeModal={closeModal} getRowClass={getRowClass} />}
    </div>
  );
};

export default ProjectStatus;
