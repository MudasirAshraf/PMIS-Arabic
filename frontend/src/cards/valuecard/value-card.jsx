import React from 'react';
import "./valuecard.scss";

const ValueCard = ({title, value}) => {
  return (
    <div className='main-container-value-card'>
        {/* ist */}
        <p className='value-i fs-md fw-500 lh-1-2'>{title}</p>
          {/* second */}
          <p className='value-ii fs-l fw-600 lh-1-3'>{value}</p>
    </div>
  )
}

export default ValueCard;