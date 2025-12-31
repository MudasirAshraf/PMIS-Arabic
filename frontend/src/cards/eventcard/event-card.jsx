import React from "react";
import "./eventcard.scss";

const EventCard = ({ date, title, onClick }) => {
  return (
    <div className="main-container-event-card" onClick={onClick}>
      <div className="container-event-card">
        <div className="hallow-cont-event-card">
          <p className="fw-700 fs-sm">{date}</p>
        </div>
        <p className="para-event-card fw-700 fs-sm lh-1-2">{title}</p>
      </div>
    </div>
  );
};

export default EventCard;
