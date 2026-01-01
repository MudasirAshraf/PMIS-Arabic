import React from 'react';
import "./budget.scss";

const Budget = ({ title, value, image, color }) => {
  return (
    <div className='main-container-BUDGET'>
      {/* First */}
      <div className='first-container-BUDGET'>
        <img src={image} alt="logo" />
      </div>
      {/* Second */}
      <div className='second-container-BUDGET'>
        <p className='container-BUDGET-para-i fs-md fw-600 lh-1'>{title}</p>
        <p className='container-BUDGET-para-ii fs-lg fw-700 lh-1-2' style={{ color: color }}>{value}</p>
      </div>
    </div>
  );
};

export default Budget;