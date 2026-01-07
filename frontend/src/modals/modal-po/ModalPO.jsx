import React from "react";
import { GrAppsRounded } from "react-icons/gr";
import { useTheme } from "../../ThemeContext";
import PieChartCustom from "../../charts/PieChart";
import "./modalpo.scss";

const MODALPO = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { theme } = useTheme();

  const total = 8970;
  const received = 7800;
  const approved = 200;
  const invoiced = 1000;

  const receivedPercent = (received / total) * 100;
  const approvedPercent = (approved / total) * 100;
  const invoicedPercent = (invoiced / total) * 100;

  return (
    <div className="chart-modal-overlay">
      <div className="chart-modal-content-summary">
        <div className="chart-modal-header">
          <div className="second-header-chart-modal">
            <GrAppsRounded
              size={20}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p className="fs-md fw-600 lh-1-2">الملخص</p>
          </div>
          <button className="chart-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Chart-Container */}
        <div className="charts-container-modal-po">
          <div className="summary-values">
            <div>
              <span className="fs-md lh-1-2 fw-700">اجمالي مبلغ :</span> <span className="fs-md lh-1-2 fw-600">{total.toLocaleString()}</span>
            </div>
            <div>
              <span className="fs-md lh-1-2 fw-700">الاستلام :</span> <span className="fs-md lh-1-2 fw-600">{received.toLocaleString()}</span>
            </div>
            <div>
              <span className="fs-md lh-1-2 fw-700">المعتمد :</span> <span className="fs-md lh-1-2 fw-600">{approved.toLocaleString()}</span>
            </div>
            <div>
              <span className="fs-md lh-1-2 fw-700">المفوتر :</span> <span className="fs-md lh-1-2 fw-600">{invoiced.toLocaleString()}</span>
            </div>
          </div>

          <div className="chart-box">
            <div className="chart-label fs-md lh-1-2 fw-700">المفوتر</div>
            <PieChartCustom
              label="المفوتر"
              value={invoicedPercent}
              thickness="1%"
              size={150}
            />
          </div>
          <div className="chart-box">
            <div className="chart-label fs-md lh-1-2 fw-700">المعتمد</div>
            <PieChartCustom
              label="المعتمد"
              value={approvedPercent}
              thickness="0.55%"
              size={150}
            />
          </div>
          <div className="chart-box">
            <div className="chart-label fs-md lh-1-2 fw-700">الاستلام</div>
            <PieChartCustom
              label="الاستلام"
              value={receivedPercent}
              thickness="1%"
              size={150}
            />
          </div>
        </div>

        {/* Button */}
        <div className="close-btn-cont-chart">
          <button className="cancel-button fs-md fw-600 lh-1" onClick={onClose}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default MODALPO;
