import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import "./scheduletable.scss";

const ScheduleTable = ({ data, onDelete, onEdit }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
    }
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="schedule-table-container">
      <table className="schedule-table">
        <thead className="schedule-table-header fs-m fw-700 lh-1-2">
          <tr>
            <th></th>
            <th>#</th>
            <th>اسم المهمة</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
            <th>% نسبة المخطط</th>
            <th>% نسبة الفعلية</th>
            <th>التكلفة</th>
            <th>المتوفر</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody className="schedule-table-body fs-m fw-500 lh-1-2">
          {data.map((row, parentIndex) => (
            <React.Fragment key={row.id}>
              <tr className="schedule-table-parent-row">
                <td
                  onClick={() => toggleRow(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  {expandedRow === row.id ? (
                    <FaChevronUp className="schedule-table-expand-icon" />
                  ) : (
                    <FaChevronDown className="schedule-table-expand-icon" />
                  )}
                </td>
                <td>{parentIndex + 1}</td>
                <td>{renderCell(row.title)}</td>
                <td>{renderCell(row.startDate)}</td>
                <td>{renderCell(row.endDate)}</td>
                <td>{renderCell(row.planned)}</td>
                <td>{renderCell(row.actual)}</td>
                <td>{renderCell(row.cost)}</td>
                <td>{renderCell(row.available)}</td>
                <td>{renderCell(row.status)}</td>
                <td>
                  <MdEdit
                    className="schedule-table-action-icon"
                    onClick={() => onEdit(row)}
                  />
                  <MdDelete
                    className="schedule-table-action-icon"
                    onClick={() => handleDeleteClick(row)}
                  />
                </td>
              </tr>

              {expandedRow === row.id &&
                row.children?.map((child, childIndex) => (
                  <tr key={child.id} className="schedule-table-child-row">
                    <td></td>
                    <td>
                      {parentIndex + 1}.{childIndex + 1}
                    </td>
                    <td>{renderCell(`↳ ${child.title}`)}</td>
                    <td>{renderCell(child.startDate)}</td>
                    <td>{renderCell(child.endDate)}</td>
                    <td>{renderCell(child.planned)}</td>
                    <td>{renderCell(child.actual)}</td>
                    <td>{renderCell(child.cost)}</td>
                    <td>{renderCell(child.available)}</td>
                    <td>{renderCell(child.status)}</td>
                    <td>
                      <MdEdit
                        className="schedule-table-action-icon"
                        onClick={() => onEdit(child)}
                      />
                      <MdDelete
                        className="schedule-table-action-icon"
                        onClick={() => handleDeleteClick(child)}
                      />
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ScheduleTable;
