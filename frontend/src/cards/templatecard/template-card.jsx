import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./tempcard.scss";

const TemplateCard = ({ title, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className="main-container-template-card" onClick={handleClick}>
      <p className='fs-md fw-700 lh-1-2'>{title}</p>
    </div>
  );
};

export default TemplateCard;
