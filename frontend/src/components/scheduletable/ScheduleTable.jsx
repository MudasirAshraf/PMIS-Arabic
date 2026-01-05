import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import "./scheduletable.scss";

const ScheduleTable = ({ data, onDelete, onEdit }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
                <td>{row.title}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td>{row.planned}</td>
                <td>{row.actual}</td>
                <td>{row.cost}</td>
                <td>{row.available}</td>
                <td>{row.status}</td>
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
                      {parentIndex + 1}.{childIndex + 1}{" "}
                    </td>
                    <td>↳ {child.title}</td>
                    <td>{child.startDate}</td>
                    <td>{child.endDate}</td>
                    <td>{child.planned}</td>
                    <td>{child.actual}</td>
                    <td>{child.cost}</td>
                    <td>{child.available}</td>
                    <td>{child.status}</td>
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
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ScheduleTable;
