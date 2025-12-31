import React, { useState, useEffect } from "react";
import "./projectcard.scss";

const ProjectCard = ({ title, image, value, onClick }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // Duration 
    const stepTime = Math.abs(Math.floor(duration / value)); 
    const timer = setInterval(() => {
      start += 1;
      if (start > value) {
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);
    return () => clearInterval(timer); 
  }, [value]);

  return (
    <div className="main-conatiner-card-I" onClick={onClick}>
      {/* first div */}
      <div className="first-container-card-I">
        <img src={image} alt="logo" />
        <p className="fs-xl fw-500">{title}</p>
      </div>
      {/* second div */}
      <div className="value-card-I">
        <p className="fs-lg fw-500">{displayValue}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
