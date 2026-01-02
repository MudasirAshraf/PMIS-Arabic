import React, { useState, useEffect } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./videocard.scss";

const VideoCard = ({ title, video, description }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = () => {
    navigate("/video-details", { state: { title, video, description } });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  return (
    <div className="main-container-video-card">
      <p className="fs-md fw-600 lh-1-2 text-start">{title}</p>
      <div className="video-wrapper" onClick={openModal}>
        <video src={video} className="video" />
        <div className="video-icon">
          <FaPlay className="video-icon" />
        </div>
      </div>
      <button className="details-btn-vc fs-md fw-700 lh-1" onClick={handleDetailsClick}>
        تفاصيل
      </button>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="video-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <video
              src={video}
              className="video-modal-player"
              controls
              autoPlay
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
