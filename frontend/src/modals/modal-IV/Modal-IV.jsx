import React, { useEffect } from "react";
import "./modalIV.scss";

const ModalIV = ({ closeModal, event }) => {
  if (!event) return null;

  const today = new Date();

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  //  Day name
  const getDayName = (day, month) => {
    const date = new Date(today.getFullYear(), month - 1, day);
    return new Intl.DateTimeFormat("ar-EG", { weekday: "long" }).format(date);
  };

  // Month name
  const getMonthName = () => {
    return new Intl.DateTimeFormat("ar-EG", { month: "long" }).format(today);
  };

  return (
    <div className="modalIV-backdrop" onClick={closeModal}>
      <div className="modalIV-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="modalIV-content">
          <h2 className="fs-md fw-700 lh-1-5">
            تفاصيل الفعالية والمشاريع القادمة
          </h2>
          <span className="modalIV-close" onClick={closeModal}>
            &times;
          </span>
        </div>

        {/* Content Details */}
        <div className="content-modal-IV">
          {/* Date, Month & Day */}
          <div className="ist-content-ModalIV">
            <p className="para-year fs-lg fw-700">
              {`${getMonthName()} ${today.getFullYear()}`}
            </p>
            <div className="hallow-cont-modalIV">
             <p className="para-date fs-lg fw-700">{event.date}</p>
            </div>
            <p className="para-month fs-lg fw-700">
              {getDayName(event.date, today.getMonth() + 1)}
            </p>
          </div>

          {/* Event Title */}
          <div className="second-content-ModalIV">
            <div className="title-second-cont-modalIV">
              <p className="para-title-I fs-lg fw-700 lh-1-2">
                عنوان الحدث باللغة العربية
              </p>
            </div>
            <p className="para-title-II fs-md fw-500 lh-1-2">{event.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalIV;
