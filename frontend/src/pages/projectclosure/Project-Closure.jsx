import React, { useState } from "react";
import { RxPadding } from "react-icons/rx";
import ProjectClosureForm from "../../forms/closure-form/ClosureForm";
import ProjectClosureOutputs from "../../components/projectclosureoutputs/ProjectClosureOutputs";
import ClosureLessonLearned from "../../components/closurelearnedlearned/ClosureLessonLearned";
import ProjectClosureTab from "../../components/projectclosuretab/ProjectClosureTab";

const ProjectClosure = () => {
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
        return <ProjectClosureForm goToNextTab={goToNextTab} />;
      case 2:
        return (
          <ProjectClosureOutputs
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        );
      case 3:
        return (
          <ClosureLessonLearned
            goToPreviousTab={goToPreviousTab}
            goToNextTab={goToNextTab}
            activeTab={activeTab}
          />
        );
      case 4:
        return <ProjectClosureTab />;
      default:
        return null;
    }
  };
  return (
    <div className="main-content-wrapper">
      {/* Header and Progress-Bar Container */}
      <div className="container-progress-wrapper">
        <div className="header-project-section">
          <RxPadding className="header-icon" />
          <p className="fs-xl fw-700 lh-1-4">إغلاق المشروع</p>
        </div>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${(activeTab / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Top-Corner-Para */}
      <div className="top-corner">
        <p className="top-corner-para fs-md fw-700 lh-1-2">
          المرحلة: الموافقة من مدير المحفظة
        </p>
      </div>
      {/* Tabs */}
      <div className="main-container-tab-container">
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 1 ? "active" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          التفاصيل الأساسي
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
          الدروس المستفادة
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 4 ? "active" : ""
          }`}
          onClick={() => setActiveTab(4)}
        >
          فحص مراجعة المشروع المكتمل
        </div>
      </div>
      {/* Render-Tab-Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ProjectClosure;
