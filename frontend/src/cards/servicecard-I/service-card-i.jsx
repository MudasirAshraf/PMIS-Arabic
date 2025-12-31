import React from "react";
import "./servicecardi.scss";

const ServiceCardI = ({ title, onClick }) => {
  return (
    <div className="main-container-service-card-i" onClick={onClick}>
      <p className="sc-para-i fw-700 fs-md lh-1">{title}</p>
    </div>
  );
};

export default ServiceCardI;
