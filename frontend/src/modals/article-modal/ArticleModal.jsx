import React, { useEffect } from 'react';
import "./articlemodal.scss";


const ArticleModal = ({ article, onClose }) => {

  useEffect(() => {
    if (article) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [article]);

  if (!article) return null;

  return (
    <div className="article-modal-overlay" onClick={onClose}>
      <div className="article-modal-content">
        <span className="article-close-btn" onClick={onClose}>
          &times;
        </span>
        <h2 className="article-modal-title fs-md lh-1-2 fw-700">{article.title}</h2>
        <img
          src={article.image}
          alt={article.title}
          className="article-modal-image"
        />
        <p className="article-modal-description fs-m fw-500 lh-1-2">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleModal;
