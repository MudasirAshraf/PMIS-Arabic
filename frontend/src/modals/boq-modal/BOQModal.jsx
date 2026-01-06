import React from "react";
import { PiSquaresFour } from "react-icons/pi";
import "./boqmodal.scss";

const BOQModal = ({ isOpen, onClose, title, headers, data }) => {
  if (!isOpen) return null;

  return (
    <div className="boq-modal-overlay">
      <div className="boq-modal-content">
        <div className="boq-modal-header">
          <div className="second-header-boq-modal">
            <PiSquaresFour className="project-icon" />
            <h2 className="fs-lg fw-700 lh-1-2">{title}</h2>
          </div>
          <button className="boq-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="table-BOQ">
          <table className="boq-modal-table">
            <thead className="fs-md fw-700 lh-1-2">
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="fs-md fw-500 lh-1-2">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BOQModal;
