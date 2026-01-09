import React, { useState, useEffect } from "react";
import { RxPadding } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import ProjectManagerForm from "../../forms/project-manager-form/ProjectManagerForm";
import "./projectmanager.scss";

const ProjectManager = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    date: "",
    specialization: "",
    delivered: "نعم",
    deliveryDate: "",
    previousManager: "",
  });
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Mudassir Ashraf - مُدَثِّر أشرف",
      date: "06/01/2025",
      specialization: "Software Engineer",
      delivered: "نعم",
      deliveryDate: "08/01/2025",
      previousManager: "John",
    },
    {
      id: 2,
      name: "Mohammed Alrefai - محمد الرفاعي",
      date: "29/01/2025",
      specialization: "Hardware Engineer",
      delivered: "نعم",
      deliveryDate: "08/01/2025",
      previousManager: "Smith",
    },
    {
      id: 1,
      name: "Mudassir Ashraf - مُدَثِّر أشرف",
      date: "06/01/2025",
      specialization: "Software Engineer",
      delivered: "نعم",
      deliveryDate: "08/01/2025",
      previousManager: "John",
    },
  ]);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedProject(null);
    setNewProject({
      name: "",
      date: "",
      specialization: "",
      delivered: "نعم",
      deliveryDate: "",
      previousManager: "",
    });
  };

  const handleSaveChanges = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    handleCloseModal();
  };

  const handleAddNewProject = () => {
    const newProjectWithId = {
      ...newProject,
      id: projects.length + 1,
    };
    setProjects([...projects, newProjectWithId]);
    handleCloseModal();
  };

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditModalOpen || isAddModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isEditModalOpen, isAddModalOpen]);

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
    <div className="main-container-project-manager">
      {/* Header */}
      <div className="header-container-project-manager">
        <div className="header-project-manager">
          <RxPadding className="header-icon" />
          <p className="fs-lg fw-700 lh-1-5">
            تعيين مدير المشروع-this is a beta test project
          </p>
        </div>
        {/* Button */}
        <div className="subheader-project-manager" onClick={handleAddClick}>
          <IoMdAdd className="second-icon" />
          <p className="fs-md fw-700 lh-1-2">إضافة الطلب</p>
        </div>
      </div>

      {/* Counter-Container */}
      <div className="second-header-project-center">
        <div className="length-count-container">
          <span className="fs-xs fw-700 lh-1-2">{projects.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="container-table-project-manager">
        <div className="project-manager-table-container">
          <table className="project-manager-table">
            <thead className="fs-md fw-700 lh-1-2">
              <tr>
                <th>#</th>
                <th>اسم مدير المشروع المرشح</th>
                <th>تاريخ الطلب</th>
                <th>التخصص</th>
                <th>هل تم تسليم؟</th>
                <th>تاريخ تسليم المشروع</th>
                <th>اسم مدير المشروع السابق</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="fs-m fw-700 lh-1">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{renderCell(project.name)}</td>
                  <td>{renderCell(project.date)}</td>
                  <td>{renderCell(project.specialization)}</td>
                  <td>{renderCell(project.delivered)}</td>
                  <td>{renderCell(project.deliveryDate)}</td>
                  <td>{renderCell(project.previousManager)}</td>

                  <td>
                    <FaPencilAlt
                      className="edit-icon"
                      onClick={() => handleEditClick(project)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit form modal */}
      {isEditModalOpen && (
        <ProjectManagerForm
          onClose={handleCloseModal}
          project={selectedProject}
          onSave={handleSaveChanges}
        />
      )}

      {/* Add form modal  */}
      {isAddModalOpen && (
        <ProjectManagerForm
          onClose={handleCloseModal}
          project={newProject}
          onSave={handleAddNewProject}
          onChange={handleNewProjectChange}
        />
      )}
    </div>
  );
};

export default ProjectManager;
