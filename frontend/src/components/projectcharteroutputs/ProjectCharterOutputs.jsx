import React from "react";
import"./projectoutputs.scss";
const ProjectCharterOutputs = ({ goToNextTab, goToPreviousTab }) => {
  return (
    <div>
      <p>Project-Section-Outputs</p>
      {/* Content here  */}
      <div></div>
      {/* Navigation-Buttons */}
      <div className="shuffle-btns-cotainer">
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

export default ProjectCharterOutputs;
