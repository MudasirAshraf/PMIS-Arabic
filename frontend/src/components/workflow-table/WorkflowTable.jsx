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
              <td>{item.projectName}</td>
              <td>{item.list}</td>
              <td>{item.stageItem}</td>
              <td>{item.requester}</td>
              <td>{item.assignedTo}</td>
              <td>{item.sentDate}</td>
              <td>{item.dueDate}</td>
              <td>{item.status}</td>
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
