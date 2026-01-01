import React from "react";
import { useNavigate } from 'react-router-dom';
import "./floatingcard.scss";

const FloatingCard = ({ title, value, Icon, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(link);
    };
  return (
    <div className="main-container-floating-card" onClick={handleClick}>
      <div className="floating-card-header">
        {Icon && <Icon className="floating-card-icon" />}
        <p className="floating-card-para fs-md fw-700 lh-1-2">{title}</p>
      </div>
      {value !== undefined && value !== null && (
        <div className="floating-card-value">
          <p className="fs-md fw-700 lh-1-2">{value}</p>
        </div>
      )}
    </div>
  );
};

export default FloatingCard;