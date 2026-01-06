import React from "react";
import { PiSquaresFour } from "react-icons/pi";
import "./historymodal.scss";

const HistoryModal = ({ onClose, data = [] }) => {
  return (
    <div className="history-modal-overlay">
      <div className="history-modal-box">
        <div className="history-modal-header">
          <div className="second-header-history-modal">
            <PiSquaresFour className="project-icon" />
            <h2 className="fs-lg fw-700 lh-1-2">مخطط سير المشروع</h2>
          </div>
          <button onClick={onClose} className="history-close-btn">
            ×
          </button>
        </div>
        <div className="history-modal-container">
          <div className="history-table-scroll">
            <table className="modal-inner-table">
              <thead className="fs-md fw-700 lh-1">
                <tr>
                  <th>#</th>
                  <th>المرحلة</th>
                  <th>الموافقة من</th>
                  <th>النتيجة</th>
                  <th>التاريخ</th>
                  <th>الملاحظات</th>
                </tr>
              </thead>
              <tbody className="fs-md fw-500 lh-1-2">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.phase}</td>
                      <td>{item.approvedBy}</td>
                      <td>{item.status}</td>
                      <td>{item.date}</td>
                      <td>{item.comment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      لا توجد بيانات متاحة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="history-btn-container">
            <button
              className="cancel-button fs-md fw-600 lh-1"
              onClick={onClose}
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
