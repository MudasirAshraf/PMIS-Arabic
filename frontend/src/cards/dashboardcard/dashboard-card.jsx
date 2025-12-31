import React from 'react';
import CountUp from 'react-countup';
import "./dashboardcard.scss";

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="dashboard-card">
        <div className="icon-section">{icon}</div>
      <div className="divider" />
      <div className="text-section-dashboard-card">
         <p className="para-dashboard-card fs-md lh-1-2 fw-700 ">{title}</p>
          <p className="value-dashboard-card fs-md lh-1-2 fw-700 "><CountUp end={value} duration={4} /></p> 
      </div>
   
    </div>
  );
};

export default DashboardCard;
