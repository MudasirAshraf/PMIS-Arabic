import React, { useState, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import GridCard from "../../cards/gridcard/grid-card";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import ProjectCenterModal from "../../modals/project-center-modal/ProjectCenterModal";
import { Grid2x2Plus, MonitorCheck } from "lucide-react";
import GridTable from "../../assets/svg/grid.svg";
import Calender from "../../assets/svg/calender.svg";
import Pencil from "../../assets/svg/pencil.svg";
import PencilWhite from "../../assets/svg/pencil-white.svg";
import Filter from "../../assets/svg/filter-icon.svg";
import FilterWhite from "../../assets/svg/filter-white.svg";
import Search from "../../assets/svg/search-icon.svg";
import SearchWhite from "../../assets/svg/search-white.svg";
import Grid from "../../assets/svg/grid-icon.svg";
import GridWhite from "../../assets/svg/grid-white.svg";
import Table from "../../assets/svg/table-icon.svg";
import TableWhite from "../../assets/svg/table-white.svg";
import "./projectcenter.scss";

const bgColors = [
  "linear-gradient(to right, rgba(210,65,65,1), rgba(108,33,33,1))",
  "linear-gradient(to right, rgba(251,190,5,1), rgba(149,113,3,1))",
  "linear-gradient(to right, rgba(28, 171, 186, 1) , rgba(13, 77, 84, 1))",
  "linear-gradient(to right, rgba(1, 113, 98, 1) , rgba(2, 215, 186, 1))",
];

// STATIC DATA
const mockProjects = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  project_title: `Project ${i + 1}`,
  description: `Description for project ${i + 1}`,
  department: ["HR", "Finance", "IT", "Marketing"][i % 4],
  phase: ["Planning", "Execution", "Closure"][i % 3],
  manager: `Manager ${i + 1}`,
  owner: `Owner ${i + 1}`,
  sponsor: `Sponsor ${i + 1}`,
  start_date: `2026-01-${String(i + 1).padStart(2, "0")}`,
  end_date: `2026-02-${String(i + 1).padStart(2, "0")}`,
  project_budget: 10000 + i * 1000,
  project_spent: 5000 + i * 500,
}));

const mockDepartments = [
  { id: 1, title: "HR" },
  { id: 2, title: "Finance" },
  { id: 3, title: "IT" },
  { id: 4, title: "Marketing" },
];

const mockPhases = [
  { id: 1, title: "Planning" },
  { id: 2, title: "Execution" },
  { id: 3, title: "Closure" },
];

const mockManagers = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  firstname: `Manager${i + 1}`,
  lastname: `Lastname${i + 1}`,
}));

const ProjectCenter = () => {
  const { theme } = useTheme();

  // --- STATES ---
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridItemsPerPage, setGridItemsPerPage] = useState(6);
  const [tableItemsPerPage, setTableItemsPerPage] = useState(12);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gridItems, setGridItems] = useState(mockProjects);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteBatch, setDeleteBatch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  //  Pagination
  useEffect(() => {
    const updateGridItems = () =>
      setGridItemsPerPage(window.innerWidth <= 768 ? 6 : 12);
    const updateTableItems = () =>
      setTableItemsPerPage(window.innerWidth <= 768 ? 15 : 12);
    updateGridItems();
    updateTableItems();
    window.addEventListener("resize", updateGridItems);
    window.addEventListener("resize", updateTableItems);
    return () => {
      window.removeEventListener("resize", updateGridItems);
      window.removeEventListener("resize", updateTableItems);
    };
  }, []);

  //  Filtering
  const filteredItems = gridItems.filter((item) => {
    const matchesSearch = (item.project_title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesDepartment = filters.department
      ? (item.department || "").toLowerCase() ===
        filters.department.toLowerCase()
      : true;

    const matchesPhase = filters.phase
      ? (item.phase || "").toLowerCase() === filters.phase.toLowerCase()
      : true;

    const matchesStartDate = filters.startDate
      ? new Date(item.start_date) >= new Date(filters.startDate)
      : true;

    const matchesEndDate = filters.endDate
      ? new Date(item.end_date) <= new Date(filters.endDate)
      : true;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesPhase &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  const totalGridPages = Math.ceil(filteredItems.length / gridItemsPerPage);
  const totalTablePages = Math.ceil(filteredItems.length / tableItemsPerPage);

  const currentGridItems = filteredItems.slice(
    (currentPage - 1) * gridItemsPerPage,
    currentPage * gridItemsPerPage
  );

  const currentTableItems = filteredItems.slice(
    (currentPage - 1) * tableItemsPerPage,
    currentPage * tableItemsPerPage
  );

  // --- Handle Save ---
  const handleSaveProject = (project) => {
    const safeProject = {
      id: project.id || gridItems.length + 1,
      project_title:
        project.projectTitle?.trim() || `Project ${gridItems.length + 1}`,
      description: project.description?.trim() || "",
      department: project.department || "Unknown",
      phase: project.phase || "Planning",
      manager: project.manager || "Unassigned",
      owner: project.owner || "Unassigned",
      sponsor: project.sponsor || "Unassigned",
      start_date:
        project.startDate instanceof Date
          ? project.startDate.toISOString().split("T")[0]
          : project.startDate || new Date().toISOString().split("T")[0],
      end_date:
        project.endDate instanceof Date
          ? project.endDate.toISOString().split("T")[0]
          : project.endDate || new Date().toISOString().split("T")[0],
      project_budget: Number(project.budget) || 0,
      project_spent: Number(project.spent) || 0,
    };

    if (projectToEdit) {
      setGridItems((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, ...safeProject } : p))
      );
    } else {
      setGridItems((prev) => [...prev, safeProject]);
    }

    setModalOpen(false);
    setProjectToEdit(null);
  };

  const handleDeleteCard = (id) => {
    setDeleteTargetId(id);
    setDeleteBatch(false);
    setDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedCards.length) {
      setDeleteBatch(true);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteBatch) {
      setGridItems((prev) => prev.filter((p) => !selectedCards.includes(p.id)));
      setSelectedCards([]);
    } else {
      setGridItems((prev) => prev.filter((p) => p.id !== deleteTargetId));
    }
    setDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleEditProject = (project) => {
    setProjectToEdit({
      id: project.id,
      project_title: project.project_title,
      description: project.description,
      department_id: project.department,
      phase_id: project.phase,
      manager_id: project.manager,
      owner_id: project.owner,
      sponsor_id: project.sponsor,
      project_budget: project.project_budget,
      project_spent: project.project_spent,
      start_date: project.start_date,
      end_date: project.end_date,
    });
    setModalOpen(true);
  };

  const pages =
    view === "grid"
      ? Array.from({ length: totalGridPages }, (_, i) => totalGridPages - i)
      : Array.from({ length: totalTablePages }, (_, i) => totalTablePages - i);

  return (
    <div>
      {/* Header */}
      <div className="home-page-grid-project">
        {/* First Row */}
        <div className="header-details">
          <p className="fs-sm fw-400 text-start">
            الاستراتيجية و التميز المؤسسي/التخطيط الاستراتيجي والأداء المؤسسي
          </p>
        </div>
        <div className="another-header-scroll-container">
          <div className="container-scroll-bar">
            <div className="scroll-container">
              <p className="fs-sm fw-400">تم تحديث نموذج ميثاق المشروع </p>
              <p className="fs-sm fw-400">
                نرجو التكرم بتحديث مشاريعكم قبل تاريخ 29/8/2024 حيث سيتم سحب
                التقرير من النظام بهذا التاريخ
              </p>
              <p className="fs-sm fw-400">تم تحديث نموذج ميثاق المشروع </p>
              <p className="fs-sm fw-400">
                نرجو التكرم بتحديث مشاريعكم قبل تاريخ 29/8/2024 حيث سيتم سحب
                التقرير من النظام بهذا التاريخ
              </p>
              <p className="fs-sm fw-400">تم تحديث نموذج ميثاق المشروع </p>
              <p className="fs-sm fw-400">
                نرجو التكرم بتحديث مشاريعكم قبل تاريخ 29/8/2024 حيث سيتم سحب
                التقرير من النظام بهذا التاريخ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container-profile-center">
        <div className="header-pc">
          <p className="fs-md fw-600 lh-1-2">
            الصفحة الرئيسية <span className="arrow"></span> مركز المشاريع
          </p>
        </div>

        {/* Icons */}
        <div className="iconlist-container">
          <div className="first-iconlist">
            <img
              src={theme === "green" ? Filter : FilterWhite}
              alt="filter"
              className="image-hover"
              onClick={() => setShowFilter((prev) => !prev)}
            />
            <img
              src={theme === "green" ? Search : SearchWhite}
              alt="search"
              className="image-hover"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          </div>
          <div className="second-iconlist">
            <img
              src={theme === "green" ? Grid : GridWhite}
              alt="grid"
              onClick={() => setView("grid")}
              className="image-hover"
            />
            <img
              src={theme === "green" ? Table : TableWhite}
              alt="table"
              onClick={() => setView("table")}
              className="image-hover"
            />
            <Grid2x2Plus
              className="icon-color"
              onClick={() => {
                setProjectToEdit(null);
                setModalOpen(true);
              }}
            />
            <MonitorCheck
              className="icon-color"
              onClick={() => setMultiSelectMode(!multiSelectMode)}
            />
            {multiSelectMode && selectedCards.length > 0 && (
              <button className="delete-button" onClick={handleDeleteSelected}>
                حذف المحدد ({selectedCards.length})
              </button>
            )}
          </div>
        </div>

        {/* Search-Filter View */}
        <SearchFilterView
          showSearch={showSearch}
          showFilter={showFilter}
          setShowSearch={setShowSearch}
          setShowFilter={setShowFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          filterLabels={["القسم", "المرحلة", "تاريخ البدء", "تاريخ الانتهاء"]}
          filterKeys={["department", "phase", "startDate", "endDate"]}
        />

        {/* Content */}
        <div className="content-container">
          {view === "grid" ? (
            <div className="grid-view">
              {currentGridItems.map((item) => (
                <GridCard
                  key={item.id}
                  id={item.id}
                  bg={bgColors[item.id % bgColors.length]}
                  projectTitle={item.project_title}
                  description={item.description}
                  department={item.department}
                  startDate={item.start_date}
                  endDate={item.end_date}
                  phase={item.phase}
                  managerName={item.manager}
                  ownerName={item.owner}
                  sponsorName={item.sponsor}
                  budget={item.project_budget}
                  spent={item.project_spent}
                  multiSelectMode={multiSelectMode}
                  selectedCards={selectedCards}
                  setSelectedCards={setSelectedCards}
                  onDelete={handleDeleteCard}
                  onEdit={(p) => {
                    setProjectToEdit({
                      id: p.id,
                      project_title: p.projectTitle,
                      description: p.description,
                      department_id: p.department,
                      phase_id: p.phase,
                      manager_id: p.managerName,
                      owner_id: p.ownerName,
                      sponsor_id: p.sponsorName,
                      project_budget: p.budget,
                      project_spent: p.spent,
                      start_date: p.startDate,
                      end_date: p.endDate,
                    });
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="project-table-wrapper">
              <table className="project-table">
                <thead className="fs-md fw-700 text-center fs-xs-mob">
                  <tr>
                    <th>رمز المشروع</th>
                    <th>اسم المشروع</th>
                    <th>مدير المشروع</th>
                    <th>القطاع</th>
                    <th>تاريخ البدء</th>
                    <th>تاريخ الانتهاء</th>
                    <th>الحالة</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="fs-md fw-500 lh-1-25 text-center fs-xs-mob">
                  {currentTableItems.map((item) => (
                    <tr key={item.id} style={{ cursor: "pointer" }}>
                      <td>{`مشروع-${item.id}`}</td>
                      <td>{item.project_title}</td>
                      <td>{item.manager}</td>
                      <td>{item.department}</td>
                      <td>
                        {new Date(item.start_date).toLocaleDateString("ar-EG")}
                      </td>
                      <td>
                        {new Date(item.end_date).toLocaleDateString("ar-EG")}
                      </td>
                      <td>
                        <div
                          className="td-div fs-sm fw-700 text-center fs-xs-mob"
                          style={{
                            background: bgColors[item.id % bgColors.length],
                          }}
                        >
                          {item.phase}
                        </div>
                      </td>
                      <td>
                        <div className="icon-cell">
                          <img src={GridTable} alt="Grid" />
                          <img src={Calender} alt="Calender" />
                          <img
                            src={theme === "green" ? Pencil : PencilWhite}
                            alt="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(item);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={
              currentPage ===
              (view === "grid" ? totalGridPages : totalTablePages)
            }
          >
            &gt;
          </button>
          <button
            onClick={() =>
              setCurrentPage(view === "grid" ? totalGridPages : totalTablePages)
            }
            disabled={
              currentPage ===
              (view === "grid" ? totalGridPages : totalTablePages)
            }
          >
            &raquo;
          </button>
        </div>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />

        {/* Project Modal */}
        <ProjectCenterModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setProjectToEdit(null);
          }}
          onSubmit={handleSaveProject}
          projectToEdit={projectToEdit}
          departments={mockDepartments}
          phases={mockPhases}
          managers={mockManagers}
        />
      </div>
    </div>
  );
};

export default ProjectCenter;
