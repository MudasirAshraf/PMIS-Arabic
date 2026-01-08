import React from "react";
import "./sidebartable.scss";

const SidebarTable = ({ tableData, columns }) => {
  const renderCell = (value) => (
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
      data-fulltext={value ?? "_"}
    >
      {value ?? "_"}
    </span>
  );

  return (
    <div className="table-wrapper">
      <table className="workflow-table-wrapper">
        <thead className="fs-md lh-1 fw-700">
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="fs-m lh-1 fw-500">
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{renderCell(item.projectName)}</td>
              <td>{renderCell(item.list)}</td>
              <td>{renderCell(item.stageItem)}</td>
              <td>{renderCell(item.requester)}</td>
              <td>{renderCell(item.assignedTo)}</td>
              <td>{renderCell(item.sentDate)}</td>
              <td>{renderCell(item.dueDate)}</td>
              <td>{renderCell(item.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SidebarTable;
