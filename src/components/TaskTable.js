import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables"; // Tabulator import
import "tabulator-tables/dist/css/tabulator.min.css"; // Tabulator CSS import

const TaskTable = ({ tasks, onDelete, onEdit }) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null); // Store the Tabulator instance

  useEffect(() => {
    // Initialize the Tabulator table if it hasn't been initialized yet
    if (!tableInstance.current) {
      tableInstance.current = new Tabulator(tableRef.current, {
        data: tasks, // Assign the tasks array to the table
        layout: "fitColumns", // Automatically fit columns to the available space
        reactiveData: true, // Enable reactive updates
        columns: [
          { title: "ID", field: "id", width: 60, hozAlign: "center", sorter: "number" },
          { title: "Title", field: "title", editor: "input" }, // Title is editable
          { title: "Description", field: "description", editor: "input" }, // Description is editable
          {
            title: "Status",
            field: "status",
            editor: "select", // Enable the select dropdown editor for status field
            editorParams: {
              values: [
                { label: "To Do", value: "To Do" },
                { label: "In Progress", value: "In Progress" },
                { label: "Done", value: "Done" },
              ], // Dropdown values for status
            },
          },
          {
            title: "Actions",
            formatter: "buttonCross", // Cross button to delete a task
            width: 100,
            hozAlign: "center",
            cellClick: (e, cell) => {
              const idToDelete = cell.getRow().getData().id;
              onDelete(idToDelete); // Call onDelete function when delete button is clicked
            },
          },
        ],
        cellEdited: (cell) => {
          const updatedTask = cell.getData(); // Get the updated task data after editing
          onEdit(updatedTask); // Pass the updated task data to the onEdit function
        },
      });
    } else {
      // If Tabulator is already initialized, update the table data
      tableInstance.current.setData(tasks);
    }

    return () => {
      // Cleanup the table instance when component unmounts
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [tasks, onDelete, onEdit]); // Re-run the effect when tasks change

  return <div ref={tableRef} className="overflow-x-auto shadow-md border rounded-lg"></div>;
};

export default TaskTable;
