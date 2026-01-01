import React from 'react';
import "./datacard.scss";

const DataCard = ({title, details}) => {
  return (
    <div className='main-container-data-card'>
        <p className='main-container-data-card-para-i fs-md fw-700 lh-1-2 text-start'>{title}</p>
        <p className='main-container-data-card-para-ii fs-md fw-600 lh-1-2 text-start'>{details}</p>
    </div>
  )
}

export default DataCard;