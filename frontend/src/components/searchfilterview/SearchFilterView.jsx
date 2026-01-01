import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./searchfilterview.scss";

const SearchFilterView = ({
  showSearch = false,
  showFilter = false,
  setShowSearch = () => {},
  setShowFilter = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
  filters = {},
  setFilters = () => {},
  filterLabels = [],
  filterKeys = [], // optional, allows dynamic mapping
}) => {
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  // --- Close on click outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSearch, setShowFilter]);

  // --- Update filters ---
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {/* Search Input */}
      {showSearch && (
        <motion.div
          ref={searchRef}
          className="container-search-project-center"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search..."
            className="input-project-center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      )}

      {/* Filter Inputs */}
      {showFilter && (
        <motion.div
          ref={filterRef}
          className="main-container-filter"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sub-container-filter">
            {filterLabels.map((label, index) => {
              const key = filterKeys[index] || label.toLowerCase();
              const isDate = key.toLowerCase().includes("date");

              return (
                <div className="ist-label-filter" key={index}>
                  <label className="fs-sm fw-700">{label}</label>
                  <input
                    type={isDate ? "date" : "text"}
                    className="input-filter"
                    value={filters[key] || ""}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchFilterView;
