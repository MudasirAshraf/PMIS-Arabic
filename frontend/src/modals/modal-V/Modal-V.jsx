import React, { useEffect } from "react";
import EventCard from "../../cards/eventcard/event-card";
import "./modalV.scss";

const ModalV = ({ events, closeModal, onEventClick }) => {
  
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);
  return (
    <div className="modalV-backdrop" onClick={closeModal}>
      <div className="modalV-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="modalV-content">
          <h2 className="fs-lg fw-700 lh-1-75">قائمة الفعاليات</h2>
          <span className="modalV-close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="content-modal-V">
          <div className="event-list-container">
            {events.map((event, index) => (
              <EventCard
                key={index}
                date={event.date}
                title={event.title}
                onClick={() => onEventClick(event)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalV;
