import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import DocumentCard from "../../cards/documnetcard/document-card";
import "./documentcenter.scss";

const folders = [
  "المجلد-الأول", "المجلد-الثاني", "المجلد-الثالث", "المجلد-الرابع", "المجلد-الخامس",
  "المجلد-السادس", "المجلد-السابع", "المجلد-الثامن", "المجلد-التاسع", "المجلد-العاشر",
  "المجلد-الحادي عشر", "المجلد-الثاني عشر", "المجلد-الثالث عشر", "المجلد-الرابع عشر", "المجلد-الخامس عشر"
];


const DocumentCenter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [foldersPerPage, setFoldersPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setFoldersPerPage(4);
      } else if (window.innerWidth <= 768) {
        setFoldersPerPage(6);
      } else {
        setFoldersPerPage(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastFolder = currentPage * foldersPerPage;
  const indexOfFirstFolder = indexOfLastFolder - foldersPerPage;
  const currentFolders = folders.slice(indexOfFirstFolder, indexOfLastFolder);

  const nextPage = () => {
    if (currentPage < Math.ceil(folders.length / foldersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNavigation = () => {
    navigate("/Knowledge-Center");
  };

  return (
    <div className="main-container-document-center">
      <div className="header-container-video-center">
        <IoArrowForwardCircle className="back-icon" onClick={handleNavigation} />
        <header className="header-video-center fs-lg fw-700 lh-1-3">مركز المستندات - استعرض ملفاتك بسهولة</header>
      </div>
      <section className="document-grid">
        {currentFolders.map((folder, index) => (
          <DocumentCard key={index} title={folder} />
        ))}
      </section>
       {/* Pagination */}
      <div className="main-container-pagination-control">
        <div className="video-pagination-controls">
          <button
            className={`video-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button
            className={`video-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[...Array(Math.ceil(folders.length / foldersPerPage)).keys()].map(
            (page) => (
              <button
                key={page + 1}
                className={`video-pagination-btn ${currentPage === page + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            )
          )}

          <button
            className={`video-pagination-btn ${currentPage === Math.ceil(folders.length / foldersPerPage) ? "disabled" : ""}`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(folders.length / foldersPerPage)}
          >
            ›
          </button>
          <button
            className={`video-pagination-btn ${currentPage === Math.ceil(folders.length / foldersPerPage) ? "disabled" : ""}`}
            onClick={() => setCurrentPage(Math.ceil(folders.length / foldersPerPage))}
            disabled={currentPage === Math.ceil(folders.length / foldersPerPage)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCenter;
