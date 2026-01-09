import React, { useEffect } from "react";
import "./modal.scss";

const Modal = ({ modalData, closeModal, getRowClass }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const renderCell = (value) => (
    <span
      className="cell-text"
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--tooltip-top",
          `${rect.top + rect.height}px`
        );
        e.currentTarget.style.setProperty("--tooltip-left", `${rect.left}px`);
      }}
      data-fulltext={value ?? "_"}
    >
      {value ?? "_"}
    </span>
  );

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="fs-xl fw-500 text-center">قائمة المشاريع</h2>
          <button className="modal-close-button" onClick={closeModal}>
            ×
          </button>
        </div>

        <div className="modal-table">
          <table>
            <thead className="fs-md fw-700 lh-1-2 text-center">
              <tr className={getRowClass(modalData.type)}>
                {modalData.columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="fs-md fw-500 lh-1-2 text-center">
              {modalData.rows.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>
                      {idx === 2 ? (
                        <span
                          className={`supervision ${getRowClass(
                            modalData.type
                          )}`}
                        >
                          {renderCell(value)}
                        </span>
                      ) : (
                        renderCell(value)
                      )}
                    </td>
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
export default Modal;
