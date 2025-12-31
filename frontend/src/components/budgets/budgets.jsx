import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import BudgetCard from "../../cards/budgetcard/budget-card";
import FileGreen from "../../assets/svg/file-green.svg";
import FileWhite from "../../assets/svg/file-white.svg";
import HandGreen from "../../assets/svg/hand-green.svg";
import HandWhite from "../../assets/svg/hand-white.svg";
import Green from "../../assets/svg/p-green.svg";
import White from "../../assets/svg/p-white.svg";
import ModalI from "../../modals/modal-I/Modal-I";
import "./budgets.scss";

const Budget = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (cardType) => {
    setModalData({
      title: cardType === "card1" ? "الموازنة" : "المتبقي",
      mainValue: cardType === "card1" ? "7,00,000,00.50" : "6,00,000,00.50",
      budgetI: {
        mainValue: "3,00,000",
        budgets: [
          {
            key: "الميزانية أ",
            value: "1,00,000",
            color:
              "linear-gradient(90deg, rgba(1, 113, 98, 1) 0%, rgba(2, 215, 186, 1) 100%)",
            image: HandGreen,
          },
          {
            key: "الميزانية ب",
            value: "50,000",
            color:
              "linear-gradient(90deg, rgba(251,190,5,1) 0%, rgba(149, 113, 3, 1) 100%)",
            image: HandGreen,
          },
          {
            key: "الميزانية ج",
            value: "75,000",
            color:
              "linear-gradient(90deg, rgba(210,65,65,1) 0%, rgba(108, 33, 33, 1) 100%)",
            image: HandGreen,
          },
          {
            key: "الميزانية د",
            value: "75,000",
            color:
              "linear-gradient(90deg, rgba(28, 171, 186, 1) 0%, rgba(13, 77, 84, 1) 100%)",
            image: HandGreen,
          },
        ],
      },
      budgetII: {
        mainValue: "3,00,000",
        budgets: [
          {
            key: "الميزانية ١",
            value: "1,00,000",
            color:
              "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(102, 102, 102, 1) 100%)",
            image: HandGreen,
          },
          {
            key: "الميزانية ٢",
            value: "2,00,000",
            color:
              "linear-gradient(90deg, rgba(1, 113, 98, 1) 0%, rgba(2, 215, 186, 1) 100%)",
            image: HandGreen,
          },
        ],
      },
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-container-section-III">
      {/* Header Details */}
      <div className="first-container-section-III">
        <img
          src={theme === "green" ? Green : theme === "light" ? White : Green}
          alt="logo"
        />
        <p className="fs-md fw-600">حالة الموازنة للعام الحالي</p>
      </div>
      {/* Content Details */}
      <div className="second-container-section-III">
        <BudgetCard
          image={
            theme === "green"
              ? HandGreen
              : theme === "light"
              ? HandWhite
              : HandGreen
          }
          title="الموازنة"
          value="7,00,000,00.50"
          theme={theme}
          type="card1"
          onClick={() => openModal("card1")}
        />
        <BudgetCard
          image={
            theme === "green"
              ? FileGreen
              : theme === "light"
              ? FileWhite
              : FileGreen
          }
          title="المتبقي"
          value="6,00,000,00.50"
          theme={theme}
          type="card2"
          onClick={() => openModal("card2")}
        />
      </div>

      {/* Modal */}
      <ModalI
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData?.title}
        budgetDetails={modalData}
      />
    </div>
  );
};

export default Budget;
