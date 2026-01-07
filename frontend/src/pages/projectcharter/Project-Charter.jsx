import React, { useState } from "react";
import { TbFocusCentered } from "react-icons/tb";
import ProjectDetailsForm from "../../forms/projectdetails-form/ProjectDetailsForm";
import ProjectCharterOutputs from "../../components/projectcharteroutputs/ProjectCharterOutputs";
import ProjectCharterRisks from "../../components/projectcharterrisk/ProjectCharterRisk";
import ProjectCharterStacks from "../../components/projectcharterstack/ProjectCharterStacks";

const ProjectCharter = () => {
  const [activeTab, setActiveTab] = useState(1);

  const goToNextTab = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  const goToPreviousTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <ProjectDetailsForm
         goToNextTab={goToNextTab}/>;
      case 2:
        return <ProjectCharterOutputs
        goToNextTab={goToNextTab}
        goToPreviousTab={goToPreviousTab}
        />;
      case 3:
        return  <ProjectCharterRisks
        goToNextTab={goToNextTab}
        goToPreviousTab={goToPreviousTab}
      />;
      case 4:
        return <ProjectCharterStacks
         goToPreviousTab={goToPreviousTab}
         activeTab={activeTab} />;
         
      default:
        return null;
    }
  };

  return (
    <div className="main-container-project-charter">
      {/* Header and Progress-Bar Container */}
      <div className="container-progress-wrapper">
        <div className="header-project-section">
          <TbFocusCentered className="header-icon" />
          <p className="fs-xl fw-700 lh-1-4">ميثاق المشروع</p>
        </div>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${(activeTab / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="main-container-tab-container">
      <div
  className={`tab-i fs-md fw-500 lh-1-2 ${activeTab === 1 ? "active" : ""}`}
  onClick={() => setActiveTab(1)}
>
  التفاصيل
</div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          المخرجات
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${activeTab === 3 ? "active" : ""}`}
          onClick={() => setActiveTab(3)}
        >
          المخاطر
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${activeTab === 4 ? "active" : ""}`}
          onClick={() => setActiveTab(4)}
        >
          أصحاب العلاقة
        </div>
      </div>

      {/* Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ProjectCharter;
