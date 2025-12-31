import React, { useState, useEffect } from "react";
import "./performcard.scss";

const PerformanceCard = ({ title, value, theme, type, onClick }) => {
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
    <div
      className={`main-container-card-V ${type} ${theme}-theme`}
      onClick={onClick} 
    >
      <p className='title-card-v fs-md fw-700'>{title}</p>
      <p className='value-card-v fs-md fw-500'>{displayValue}</p>
    </div>
  );
};

export default PerformanceCard;
