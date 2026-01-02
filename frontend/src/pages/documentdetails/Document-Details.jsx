import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import "./documentdetails.scss";

const DocumentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { doc } = location.state || {};

  if (!doc) {
    return <h2>No Document Selected</h2>;
  }

  return (
    <div className="main-container-doc-wrapper"> 
        <div className="back-icon-container">
              <IoArrowForwardCircle
              onClick={() => navigate(-1)}
                className="back-icon"
              />
            </div>
      <div className="doc-header">
        <h1 className="doc-title fs-lg lh-1-2 fw-600">{doc.title}</h1>
      </div>
      {/* Document Preview */}
      <div className="doc-details-wrapper">
        <div className="doc-preview-section">
          {doc.type === "pdf" ? (
            <embed src={doc.file} className="doc-preview" type="application/pdf" />
          ) : doc.type === "image" ? (
            <img src={doc.file} alt={doc.title} className="doc-preview" />
          ) : (
            <p className="doc-unavailable">File format not previewable.</p>
          )}
        </div>
      </div>
      <p className="video-description fs-lg fw-500 lh-1-6 fs-s-mob">{doc.description}</p>
      
    </div>
  );
};

export default DocumentDetails;
