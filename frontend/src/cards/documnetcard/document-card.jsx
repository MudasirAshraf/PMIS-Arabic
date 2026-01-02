import React from 'react';
import { FcFolder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import "./documentcard.scss";

const DocumentCard = ({ title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/folder-view", { state: { title } });
  };

  return (
    <div className="main-container-document-card" onClick={handleClick}>
      <p className="para-document fs-md fw-700 lh-1-2 text-start">{title}</p>
      <FcFolder className='folder-icon' />
    </div>
  );
};

export default DocumentCard;