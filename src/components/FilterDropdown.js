import React from "react";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <div className="mb-6">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
