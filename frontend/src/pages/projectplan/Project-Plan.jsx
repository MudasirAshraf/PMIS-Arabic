import React, { useState } from "react";
import { GoProjectTemplate } from "react-icons/go";
import ProjectPlanForm from "../../forms/projectplanform/ProjectPlanForm";
import ProjectPlanOutputs from "../../components/projectplanoutputs/ProjectPlanOutputs";
import ProjectPlanRisks from "../../components/projectplanrisks/ProjectPlanRisks";
import ConstraintAssumptions from "../../components/constraintassumptions/ConstraintAssumptions";
import Approvals from "../../components/approvals/Approvals";
import CommunicationPlan from "../../components/communicationplan/CommunicationPlan";
import EscalationProcess from "../../components/escalationprocess/EscalationProcess";
import PlanStakeholders from "../../components/planstakeholders/PlanStakeHolders";

const ProjectPlan = () => {
  const [activeTab, setActiveTab] = useState(1);

  const goToNextTab = () => {
    if (activeTab < 8) {
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
        return <ProjectPlanForm goToNextTab={goToNextTab} />;
      case 2:
        return (
          <ProjectPlanOutputs
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        );
      case 3:
        return (
          <ProjectPlanRisks
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        );
      case 4:
        return (
          <ConstraintAssumptions
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        );
      case 5:
        return (
          <Approvals
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        );
        case 6:
          return <CommunicationPlan
          goToNextTab={goToNextTab}
          goToPreviousTab={goToPreviousTab}
          />;
        case 7:
          return <EscalationProcess
          goToNextTab={goToNextTab}
          goToPreviousTab={goToPreviousTab}
          />;
        case 8:
          return <PlanStakeholders
          goToPreviousTab={goToPreviousTab}
          activeTab={activeTab}
          />;
      default:
        return null;
    }
  };
  return (
    <div className="main-content-wrapper">
      {/* Header and Progress-Bar Container */}
      <div className="container-progress-wrapper">
        <div className="header-project-section">
          <GoProjectTemplate className="header-icon" />
          <p className="fs-xl fw-700 lh-1-4">خطة المشروع</p>
        </div>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${(activeTab / 8) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Tabs */}
      <div className="main-container-tab-container">
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 1 ? "active" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          التفاصيل
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 2 ? "active" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          المخرجات
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 3 ? "active" : ""
          }`}
          onClick={() => setActiveTab(3)}
        >
          المخاطر
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 4 ? "active" : ""
          }`}
          onClick={() => setActiveTab(4)}
        >
          قيود وافتراضات
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 5 ? "active" : ""
          }`}
          onClick={() => setActiveTab(5)}
        >
          اعتمادات
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 6 ? "active" : ""
          }`}
          onClick={() => setActiveTab(6)}
        >
          خطة الاتصال
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 7 ? "active" : ""
          }`}
          onClick={() => setActiveTab(7)}
        >
          عملية التصعيد
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 8 ? "active" : ""
          }`}
          onClick={() => setActiveTab(8)}
        >
          أصحاب العلاقة
        </div>
      </div>
      {/* Render-Tab-Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ProjectPlan;
