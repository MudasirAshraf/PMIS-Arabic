import React from "react";
import { FaEye, FaProjectDiagram } from "react-icons/fa";
import "./workflowtable.scss";

const WorkflowTable = ({
  tableData,
  historyData,
  attachments,
  onViewWorkflow,
  onViewHistory,
  columns,
}) => {
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
    <div className="workflow-table-container">
      <table className="workflow-table">
        <thead className="fs-m fw-700 lh-1">
          <tr>
            <th>#</th>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>الخيارات</th>
          </tr>
        </thead>
        <tbody className="fs-sm fw-500 lh-1">
          {tableData.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              <td>{index + 1}</td>
              <td>{renderCell(item.projectName)}</td>
              <td>{renderCell(item.list)}</td>
              <td>{renderCell(item.stageItem)}</td>
              <td>{renderCell(item.requester)}</td>
              <td>{renderCell(item.assignedTo)}</td>
              <td>{renderCell(item.sentDate)}</td>
              <td>{renderCell(item.dueDate)}</td>
              <td>{renderCell(item.status)}</td>
              <td>
                <div className="td-icon-container">
                  <FaEye
                    className="icon-td-I"
                    title="عرض"
                    onClick={() => onViewWorkflow({ ...item, attachments })}
                  />
                  <FaProjectDiagram
                    className="icon-td-I"
                    title="مخطط المشروع"
                    onClick={() => onViewHistory(historyData)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowTable;
