import React from 'react';
import "./heatmapcard.scss";

const HeatMapCard = ({value, title}) => {
  return (
    <div className='main-container-heatmap-card'>
     {/* ist */}
     <div className='ist-section-heatmap'>
        <p className='fs-md fw-700 lh-1-2'>{value}</p>
     </div>
        {/* second */}
        <div className='second-section-heatmap'>
            <p className='fs-md fw-700 lh-1-2'>{title}</p>
        </div>
    </div>
  )
}

export default HeatMapCard;