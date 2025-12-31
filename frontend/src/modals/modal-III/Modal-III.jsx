import React, { useEffect } from "react";
import DonutChartD3 from "../../charts/DonutChart";
import "./modalIII.scss";

const ModalIII = ({ closeModal }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);
  return (
    <div className="modalIII-backdrop" onClick={closeModal}>
      <div className="modalIII-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="modalIII-content">
          <span className="modalIII-close" onClick={closeModal}>
            &times;
          </span>
          <h2 className="fw-700 fs-md lh-1-5">
            ملخص مشاريع الهيئة
           
            حسب الأهداف الاستراتيجية
          </h2>
        </div>

        {/* Content Details */}
        <div className="content-modal-III">
          {/* Left Tables */}
          <div className="tables-left">
            <div className="table-container">
              <table className="stats-table">
                <thead className="fw-700 fs-lg lh-1-3">
                  <tr>
                    <th>البند</th>
                    <th>الإجمالي</th>
                    <th>تحضير</th>
                    <th>تنفيذ</th>
                    <th>إغلاق</th>
                  </tr>
                </thead>
                <tbody className="fs-md lh-1-2 fw-700">
                  <tr>
                    <td>عدد</td>
                    <td>10</td>
                    <td>3</td>
                    <td>5</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-container">
              <table className="stats-table">
                <thead className="fw-700 fs-lg lh-1-3">
                  <tr>
                    <th>البند</th>
                    <th>الإجمالي</th>
                    <th>تحضير</th>
                    <th>تنفيذ</th>
                    <th>إغلاق</th>
                  </tr>
                </thead>
                <tbody className="fs-md lh-1-2 fw-700">
                  <tr>
                    <td>عدد</td>
                    <td>10</td>
                    <td>3</td>
                    <td>5</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Chart */}
   <DonutChartD3/>
          {/* Right Tables */}
          <div className="tables-right">
            <div className="table-container">
              <table className="stats-table">
                <thead className="fw-700 fs-lg lh-1-3">
                  <tr>
                    <th>البند</th>
                    <th>الإجمالي</th>
                    <th>تحضير</th>
                    <th>تنفيذ</th>
                    <th>إغلاق</th>
                  </tr>
                </thead>
                <tbody className="fs-md lh-1-2 fw-700">
                  <tr>
                    <td>عدد</td>
                    <td>10</td>
                    <td>3</td>
                    <td>5</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-container">
              <table className="stats-table">
                <thead className="fw-700 fs-lg lh-1-3">
                  <tr>
                    <th>البند</th>
                    <th>الإجمالي</th>
                    <th>تحضير</th>
                    <th>تنفيذ</th>
                    <th>إغلاق</th>
                  </tr>
                </thead>
                <tbody className="fs-md lh-1-2 fw-700">
                  <tr>
                    <td>عدد</td>
                    <td>10</td>
                    <td>3</td>
                    <td>5</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalIII;
