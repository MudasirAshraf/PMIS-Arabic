import React, { useRef, useState } from "react";
import { BsGrid1X2 } from "react-icons/bs";
import { useTheme } from "../../ThemeContext";
import { MdEdit } from "react-icons/md";
import { AiOutlineSearch, AiOutlineSchedule } from "react-icons/ai";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScheduleTable from "../../components/scheduletable/ScheduleTable";
import ScheduleModal from "../../modals/schedule-modal/ScheduleModal";
import "./schedulecenter.scss";

const ScheduleCenter = () => {
  const { theme } = useTheme();
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("الكل");

  const [data, setData] = useState([
    {
      id: 1,
      title: "المهمة 1",
      startDate: "16/02/2023",
      endDate: "21/05/2023",
      planned: "100%",
      actual: "100%",
      cost: "402,500.00",
      available: "402,500.00",
      status: "مغلق",
      children: [
        {
          id: "1.1",
          title: "Sprint #1",
          startDate: "16/02/2023",
          endDate: "15/03/2023",
          planned: "100%",
          actual: "100%",
          cost: "120.00",
          available: "0.00",
          status: "مغلق",
        },
      ],
    },
    {
      id: 2,
      title: "المهمة 2",
      startDate: "01/01/2024",
      endDate: "10/03/2024",
      planned: "80%",
      actual: "20%",
      cost: "150,000.00",
      available: "120,000.00",
      status: "متأخر جدا",
      children: [
        {
          id: "2.1",
          title: "Phase 1",
          startDate: "01/01/2024",
          endDate: "31/01/2024",
          planned: "50%",
          actual: "10%",
          cost: "50,000.00",
          available: "40,000.00",
          status: "متأخر جدا",
        },
      ],
    },
  ]);

  const [dependencies, setDependencies] = useState([
  {
    id: 1,
    fromTask: "مهمة 1",
    fromStart: "01/05/2024",
    fromEnd: "01/06/2024",
    type: "Finish-to-Start",
    toTask: "مهمة 2",
    toStart: "02/06/2024",
    toEnd: "10/06/2024",
  },
  {
    id: 2,
    fromTask: "تحليل المتطلبات",
    fromStart: "05/05/2024",
    fromEnd: "15/05/2024",
    type: "Start-to-Start",
    toTask: "تصميم النظام",
    toStart: "15/05/2024",
    toEnd: "25/05/2024",
  },
  {
    id: 3,
    fromTask: "برمجة قاعدة البيانات",
    fromStart: "20/05/2024",
    fromEnd: "30/05/2024",
    type: "Finish-to-Finish",
    toTask: "اختبارات النظام",
    toStart: "25/05/2024",
    toEnd: "30/05/2024",
  },
]);


  const totalTasks = data.reduce(
    (acc, task) => acc + 1 + (task.children?.length || 0),
    0
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      toast.success("تم رفع الجدول الزمني بنجاح!");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSetBaseline = () => {
    if (uploadedFile) {
      toast.success("تم تعيين الخط الأساسي بنجاح!");
    } else {
      toast.error("يرجى رفع جدول زمني أولاً.");
    }
  };

  const handleDelete = (itemToDelete) => {
    setData((prevData) =>
      prevData
        .map((parent) => {
          if (parent.id === itemToDelete.id) {
            return null;
          }
          const filteredChildren = parent.children?.filter(
            (child) => child.id !== itemToDelete.id
          );
          return { ...parent, children: filteredChildren };
        })
        .filter(Boolean)
    );
  };

  const filteredData = data
    .map((item) => {
      const filteredChildren =
        item.children?.filter((child) =>
          filter === "الكل" ? true : child.status === filter
        ) || [];

      const isParentMatch = filter === "الكل" || item.status === filter;

      if (isParentMatch || filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter(Boolean);

  const formatToDisplayDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Save
const handleSaveTask = (task) => {
  const formattedTask = {
    ...task,
    startDate: formatToDisplayDate(task.startDate),
    endDate: formatToDisplayDate(task.endDate),
  };

  if (editTask) {
    let updated = false;

    const newData = data.map((parent) => {
      if (parent.id === task.id) {
        updated = true;
        return { ...parent, ...formattedTask };
      }

      const updatedChildren = parent.children?.map((child) => {
        if (child.id === task.id) {
          updated = true;
          return { ...child, ...formattedTask };
        }
        return child;
      });

      return { ...parent, children: updatedChildren };
    });

    if (updated) {
      setData(newData);
    }
  } else {
    const newTask = {
      ...formattedTask,
      id: task.id || Date.now(),
      children: []
    };
    setData((prev) => [...prev, newTask]);
  }

  setEditTask(null);
  setModalOpen(false);
};




  return (
    <div className="main-container-schedule-center">
      {/* Header */}
      <div className="header-schedule-center">
        <div className="first-header-schedule-center">
          <BsGrid1X2
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            جدول الزمني - مشروع تطوير و تصميم منظومة الحساب الوقفي الرقمي "أوقاف
            PAY"
          </p>
        </div>
        <div>
          <button
          className="add-modal-button fs-md fw-600 lh-1-2"
            onClick={() => {
              setEditTask(null);
              setModalOpen(true);
            }}
          >
            <MdEdit
              size={17}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p>إضافة مهمة</p>
          </button>
        </div>
      </div>

      {/* Search-Bar && Document-Length */}
      <div className="container-search-length">
        <p className="search-para fs-md fw-700 lh-1-2">
          جميع الملاحظات
          <span className="search-span fs-sm fw-700 lh-1">{totalTasks}</span>
        </p>
        <div className="search-box">
          <input type="text" placeholder="ابحث..." className="search-input" />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>

      {/* Filter & Upload */}
      <div className="filter-container-sc">
        <div className="schedule-buttton-container">
          <button className="query-btn fs-md fw-700 lh-1" onClick={() => setFilter("الكل")}>
            الكل
          </button>
          <button
            className="query-btn fs-md fw-700 lh-1"
            onClick={() => setFilter("متأخر جدا")}
          >
            متأخر جدا
          </button>
          <button className="query-btn fs-md fw-700 lh-1" onClick={() => setFilter("مغلق")}>
            مغلق
          </button>
        </div>
        <div className="upload-container-sc">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <button className="query-btn fs-md fw-700 lh-1">
            <AiOutlineSchedule />
          </button>
          <button
            className="query-btn fs-md fw-700 lh-1"
            onClick={handleSetBaseline}
            disabled={!uploadedFile}
          >
            تعيين خط الأساسي
          </button>
          <button className="query-btn fs-md fw-700 lh-1" onClick={triggerFileInput}>
            رفع جدول الزمني
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Schedule-Table */}
      <ScheduleTable
        data={filteredData}
        onDelete={handleDelete}
        onEdit={(task) => {
          setEditTask(task);
          setModalOpen(true);
        }}
      />
      {/* Schedule-Modal */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editTask}
      />

      {/* Second-Section */}
      <div className="section-schedule-center">
        <p className="para-schedue-center fs-lg fw-700 lh-1-3">الاعتمادات</p>
      </div>
      {/* Dependency-Table */}
      <div className="dependency-table-container">
        <table className="dependency-table">
          <thead className="dependency-table-header fs-m fw-700 lh-1-2">
            <tr>
              <th>#</th>
              <th>اسم المهمة</th>
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
              <th>نوع الاعتمادية</th>
              <th>اسم المهمة</th>
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
            </tr>
          </thead>
         <tbody className="dependency-table-body fs-m fw-500 lh-1-2">
  {dependencies.map((dep, idx) => (
    <tr key={dep.id}>
      <td>{idx + 1}</td>
      <td>{dep.fromTask}</td>
      <td>{dep.fromStart}</td>
      <td>{dep.fromEnd}</td>
      <td>{dep.type}</td>
      <td>{dep.toTask}</td>
      <td>{dep.toStart}</td>
      <td>{dep.toEnd}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleCenter;
