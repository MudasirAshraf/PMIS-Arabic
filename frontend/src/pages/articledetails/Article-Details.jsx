import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import "./articledetails.scss";

const ArticleDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, image, description } = location.state || {};

  if (!title || !image || !description) {
    return <p>No article found!</p>;
  }

  return (
    <div className="main-article-details-container">
      <IoArrowForwardCircle className="back-button" onClick={() => navigate(-1)}/>
      <h1 className="article-title fs-lg fw-700 lh-1-3 text-center">{title}</h1>
      <img src={image} alt={title} className="article-details-image" />
      <p className="article-description fs-md lh-1-3 fw-500">{description}</p>
    </div>
  );
};

export default ArticleDetails;
