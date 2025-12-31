import React, { useEffect } from "react";
import HandGreen from "../../assets/svg/hand-green.svg";
import "./modalI.scss";

const ModalI = ({ isOpen, onClose, title, budgetDetails }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      return () => {
        document.body.classList.remove("modal-open");
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-custom">
          <h2 className="fs-xl fw-500">إحصائيات الميزانية</h2>
          <button className="modal-close-button-custom" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="custom-modal-header-container">
          <div className="custom-modal-header">
            <img src={HandGreen} alt="logo" />
            <div className="custom-modal-header-flex">
            <h2 className="fs-xl fw-500">{title}</h2>
            <p className="fs-md fw-500">{budgetDetails.mainValue}</p>
            </div>
          </div>
        </div>
        <div className="custom-modal-body">
          <div className="custom-budget-section">
            <div className="custom-budget-section-I">
              <div className="custom-budget-section-details-I">
                <img src={HandGreen} alt="logo" />
                <div>
                <h3 className="fs-md fw-500 lh-1-5">الميزانية الأولى</h3>
                <p className="fs-md fw-500">{budgetDetails.budgetI.mainValue}</p>
                </div>
              </div>
            </div>
            <div className="custom-budget-cards-I">
              {budgetDetails.budgetI.budgets.map(
                ({ key, value, color, image }) => (
                  <div
                    className="custom-budget-card"
                    style={{ background: color }}
                    key={key}
                  >
                    <div>
                      <img src={image} alt={`${key} logo`} />
                    </div>
                    <div className="details-custom-budget-card">
                      <h4 className="fs-md fw-500">{key}</h4>
                      <p className="fs-sm fw-500">{value}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="custom-budget-section">
            <div className="custom-budget-section-I">
              <div className="custom-budget-section-details-II">
                <img src={HandGreen} alt="logo" />
                <div>
                <h3 className="fs-md fw-500 lh-1-5">الميزانية الأولى</h3>
                <p className="fs-md fw-500">{budgetDetails.budgetII.mainValue}</p>
                </div>
              </div>
            </div>
            <div className="custom-budget-cards-II">
              {budgetDetails.budgetII.budgets.map(
                ({ key, value, color, image }) => (
                  <div
                    className="custom-budget-card"
                    style={{ background: color }}
                    key={key}
                  >
                    <div>
                      <img src={image} alt={`${key} logo`} />
                    </div>
                    <div className="details-custom-budget-card">
                      <h4 className="fs-md fw-500">{key}</h4>
                      <p className="fs-sm fw-500">{value}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalI;
