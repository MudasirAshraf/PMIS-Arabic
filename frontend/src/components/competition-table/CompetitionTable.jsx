import React, { useMemo, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import "./competitiontable.scss";

const CompetitionTable = ({
  data = [],
  filterType,
  searchQuery,
  onCountChange,
}) => {
  const columns = [
    "اسم المنافسة",
    "القطاع",
    "تاريخ الإعلان عن الطرح",
    "سنة المنافسة",
    "الميزانية",
    "صاحب الطلب",
    "أسلوب الشراء",
    "نوع المنافسة",
    "نوع وظيفة الأعمال والمشتريات",
    "مكان التنفيذ",
    "الوصف",
    "الملاحظات",
    "المرفق",
    "",
  ];

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
      data-fulltext={value ?? "—"}
    >
      {value ?? "—"}
    </span>
  );

  const allData = data;

  const filtered = useMemo(() => {
    return allData.filter((item) => {
      const matchesType = filterType === "" || item.type.includes(filterType);
      const matchesSearch =
        searchQuery === "" ||
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [allData, filterType, searchQuery]);

  useEffect(() => {
    onCountChange(filtered.length);
  }, [filtered, onCountChange]);

  return (
    <div className="competitions-table-container">
      <table className="competitions-table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <tr key={i}>
                <td>{renderCell(item.competition)}</td>
                <td>{renderCell(item.sector)}</td>
                <td>{renderCell(item.date)}</td>
                <td>{renderCell(item.year)}</td>
                <td>{renderCell(item.budget)}</td>
                <td>{renderCell(item.requester)}</td>
                <td>{renderCell(item.method)}</td>
                <td>{renderCell(item.type)}</td>
                <td>{renderCell(item.function)}</td>
                <td>{renderCell(item.location)}</td>
                <td>{renderCell(item.description)}</td>
                <td>{renderCell(item.notes)}</td>
                <td>{renderCell(item.attachment || "—")}</td>

                <td className="actions-cell">
                  <button className="view-btn">
                    <AiOutlineEye size={18} /> عرض
                  </button>
                  <button className="edit-btn">
                    <MdEdit size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                لا توجد نتائج مطابقة
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionTable;
