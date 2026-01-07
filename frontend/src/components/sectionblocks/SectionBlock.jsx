import React from 'react';
import "./sectionblock.scss";

const SectionBlock = ({ title, children }) => {
  return (
    <div className="tab-section-block">
      <label className="tab-section-label fs-md fw-400 lh-1-2">{title}</label>
      <div className="tab-section-content">{children}</div>
    </div>
  );
};

export default SectionBlock;
