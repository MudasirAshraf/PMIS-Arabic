import React, { useState } from "react";
import { SiNintendogamecube } from "react-icons/si";
import { useTheme } from "../../ThemeContext";
import DeliverableTable from "../../components/deliverable-table/DEliverableTable";
import "./deliverable.scss";

const DeliverablesCenter = () => {
  const { theme } = useTheme();
  const [deliverablesCount, setDeliverablesCount] = useState(0);
  return (
    <div className="main-container-deliverable-center">
      {/* Header */}
      <div className="header-deliverable-center">
        <div className="first-header-deliverable-center">
          <SiNintendogamecube
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-lg fw-700 lh-1-4">
            المخرجات - مشروع تطوير و تصميم منظومة منصة الحساب الوقفي الرقمي
            "أوقاف PAY
          </p>
        </div>
      </div>
      {/* Second-Header */}
      <div className="header-deliverable-center">
        <p className="fs-lg fw-700 lh-1-3">
          جميع المخرجات
          <span className="fs-sm fw-700 lh-1-5">{deliverablesCount}</span>
        </p>
      </div>
      {/* Table */}
      <DeliverableTable onDataLengthChange={setDeliverablesCount} />
    </div>
  );
};

export default DeliverablesCenter;
