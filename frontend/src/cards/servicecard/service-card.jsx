import React from "react";
import "./servicecard.scss";

const ServiceCard = ({ title, image, showValue,  onClick}) => {
  return (
    <div className="main-container-card-II" onClick={onClick}>
      <img src={image} alt="logo" />
      <p className="fs-sm fw-700 text-center fs-xs-mob">{title}</p>
      {showValue && <div className="value-card-ii fs-xs fw-400 fs-xs-mob">5</div>}
    </div>
  );
};

export default ServiceCard;
