import React, { useState, useEffect } from "react";
import "./projstatuscard.scss";

const ProjectStatusCard = ({title,value,theme,type, onClick}) => {
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
    <div className={`main-container-card-IV ${type} ${theme}-theme`}
    onClick={onClick}
    >
        <p className='title-card-iv fs-md fw-700'>{title}</p>
        <p className='value-card-iv fs-md fw-500'>{displayValue}</p>
        </div>
  )
}
export default ProjectStatusCard;