import React, { useState } from "react";
import { FaWpforms } from "react-icons/fa6";
import RequestForm from "../../forms/request-form/RequestForm";
import ChangeRequestData from "../../forms/changerequestdata/ChangeRequestData";
import PreviousChange from "../../components/previouschange/PreviousChange";
import AddDocuments from "../../components/add-documents/AddDocuments";
import RequestStakeHolders from "../../components/requeststakeholders/RequestStakeHolders";

const ChangeRequest = () => {
  const [activeTab, setActiveTab] = useState(1);

  const goToNextTab = () => {
    if (activeTab < 5) {
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
        return <RequestForm goToNextTab={goToNextTab} />;
      case 2:
        return (
          <ChangeRequestData
            goToPreviousTab={goToPreviousTab}
            goToNextTab={goToNextTab}
          />
        );
      case 3:
        return (
          <PreviousChange
            goToPreviousTab={goToPreviousTab}
            goToNextTab={goToNextTab}
          />
        );
      case 4:
        return (
          <AddDocuments
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        );
      case 5:
        return (
          <RequestStakeHolders
            goToPreviousTab={goToPreviousTab}
            activeTab={activeTab}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-content-wrapper">
      {/* Header and Progress-Bar Container */}
      <div className="container-progress-wrapper">
        <div className="header-project-section">
          <FaWpforms className="header-icon" />
          <p className="fs-xl fw-700 lh-1-4">طلب التغيير</p>
        </div>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${(activeTab / 5) * 100}%` }}
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
          التفاصيل الأساسي
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 2 ? "active" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          بيانات طلب التغيير
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 3 ? "active" : ""
          }`}
          onClick={() => setActiveTab(3)}
        >
          أوامر تغيير سابقة
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 4 ? "active" : ""
          }`}
          onClick={() => setActiveTab(4)}
        >
          المستندات
        </div>
        <div
          className={`tab-i fs-md fw-500 lh-1-2 ${
            activeTab === 5 ? "active" : ""
          }`}
          onClick={() => setActiveTab(5)}
        >
          أصحاب العلاقة
        </div>
      </div>

      {/* Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ChangeRequest;
