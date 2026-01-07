import React from "react";
import "./projplanoutputs.scss";

const ProjectPlanOutputs = ({ goToNextTab, goToPreviousTab }) => {
  return (
    <div>
      <p>Project-Plan-Outputs</p>
      {/* Content here  */}
      <div></div>
      {/* Navigation-Buttons */}
      <div className="shuffle-btns-container">
        {goToPreviousTab && (
          <button className="prev fs-md fw-600 lh-1-2" onClick={goToPreviousTab}>
            السابق
          </button>
        )}
        {goToNextTab && (
          <button className="next fs-md fw-600 lh-1-2" onClick={goToNextTab}>
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectPlanOutputs;
