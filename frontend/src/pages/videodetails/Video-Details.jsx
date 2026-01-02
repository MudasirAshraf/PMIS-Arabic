import React from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import "./videodetails.scss";

const VideoDetails = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const { title, video, description } = location.state || {};
  const handleNavigation = () => {
    Navigate("/Video-Center");
  };

  return (
    <div className="main-container-video-details">
      <div className="back-icon-container">
        <IoArrowForwardCircle
          className="back-icon"
          onClick={handleNavigation}
        />
      </div>
      <div className="video-details-container">
        <p className="video-description fs-lg fw-700 lh-1-2">{title}</p>
        <video
          src={video}
          className="video-fullscreen"
          controls
          autoPlay
        ></video>
        <p className="video-description fs-lg fw-500 lh-1-2 fs-s-mob">{description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
