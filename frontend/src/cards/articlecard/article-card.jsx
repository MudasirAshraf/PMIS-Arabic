import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./articlecard.scss";

const ArticleCard = ({ title, image, description, onView }) => {
  const navigate = useNavigate();

  return (
    <div className="main-container-article-card">
      <p className="title-ac fs-m fw-700 lh-1 text-start">{title}</p>
      <img src={image} alt={title} loading="lazy" className="article-image" />
      <div className="button-container-fv">
        <button className="view-btn-fv fs-md fw-600 lh-1" onClick={onView}>
          <FaEye className="icon-fv" /> عرض
        </button>
        <button
          className="details-btn-fv fs-md fw-600 lh-1"
          onClick={() =>
            navigate(`/article-details`, {
              state: { title, image, description },
            })
          }
        >
          تفاصيل
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
