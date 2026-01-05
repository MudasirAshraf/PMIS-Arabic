import React from "react";
import { FaTrash, FaEdit, FaComment } from "react-icons/fa";
import "./table.scss";

const Table = ({ columns, displayedData, onDelete, onChat, onEdit }) => {
  return (
    <div className="risk-center-table-container">
      <table className="risk-center-table">
        <thead className="fs-md fw-700 lh-1-2">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody className="fs-md fw-500 lh-1-2">
          {displayedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <span
                    className="cell-text"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty(
                        "--tooltip-top",
                        `${rect.top + rect.height}px`
                      );
                      e.currentTarget.style.setProperty(
                        "--tooltip-left",
                        `${rect.left}px`
                      );
                    }}
                    data-fulltext={cell ?? "_"}
                  >
                    {cell ?? "_"}
                  </span>
                </td>
              ))}
              <td className="actions-column">
                {onEdit && (
                  <FaEdit
                    className="icon edit-icon"
                    title="تعديل"
                    onClick={() => onEdit(rowIndex)}
                  />
                )}
                {onChat && (
                  <FaComment
                    className="icon message-icon"
                    title="رسالة"
                    onClick={() => onChat(row)}
                  />
                )}
                {onDelete && (
                  <FaTrash
                    className="icon delete-icon"
                    title="حذف"
                    onClick={() => onDelete(rowIndex)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
