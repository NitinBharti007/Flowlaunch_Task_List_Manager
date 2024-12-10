import React from "react";
import {
  IconButton,
  Select,
  MenuItem,
  TextField,
  Paper,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskTable = ({ tasks, onDelete, onEdit }) => {
  // Handle inline editing for title, description, and status
  const handleEdit = (id, field, value) => {
    const updatedTask = tasks.map((task) =>
      task.id === id ? { ...task, [field]: value } : task
    );
    const editedTask = updatedTask.find((task) => task.id === id);
    onEdit(editedTask); // Trigger the edit handler with the updated task
  };

  return (
    <div className="my-4">
      {/* Table for larger screens */}
      <div className="hidden sm:block">
        <Paper className="overflow-hidden shadow-lg rounded-lg">
          <table className="min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="font-semibold text-lg p-3">ID</th>
                <th className="font-semibold text-lg p-3">Title</th>
                <th className="font-semibold text-lg p-3">Description</th>
                <th className="font-semibold text-lg p-3">Status</th>
                <th className="font-semibold text-lg p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="text-center py-3">{task.id}</td>
                  <td className="py-3">
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={task.title}
                      onChange={(e) =>
                        handleEdit(task.id, "title", e.target.value)
                      }
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          fontWeight: "bold",
                          backgroundColor: "#f0f4f8",
                          borderRadius: "8px",
                          padding: "10px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#333", fontSize: "14px" },
                      }}
                      onFocus={(e) => (e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")}
                      onBlur={(e) => (e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)")}
                    />
                  </td>
                  <td className="py-3">
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={task.description}
                      onChange={(e) =>
                        handleEdit(task.id, "description", e.target.value)
                      }
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "8px",
                          padding: "10px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#333", fontSize: "14px" },
                      }}
                      onFocus={(e) => (e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")}
                      onBlur={(e) => (e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)")}
                    />
                  </td>
                  <td className="text-center py-3">
                    <Select
                      value={task.status}
                      onChange={(e) =>
                        handleEdit(task.id, "status", e.target.value)
                      }
                      size="small"
                      style={{
                        fontSize: "14px",
                        backgroundColor: "#f0f4f8",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <MenuItem value="To Do">To Do</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </Select>
                  </td>
                  <td className="text-center py-3">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(task.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>

      {/* Mobile-friendly layout */}
      <div className="sm:hidden">
        {tasks.map((task) => (
          <div key={task.id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-lg">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-xl text-gray-700">ID:</span>
              <span className="text-gray-600">{task.id}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-lg text-gray-700">Title:</span>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={task.title}
                onChange={(e) => handleEdit(task.id, "title", e.target.value)}
                InputProps={{
                  style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f0f4f8",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </div>
            <div className="mb-2">
              <span className="font-semibold text-lg text-gray-700">Description:</span>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={task.description}
                onChange={(e) => handleEdit(task.id, "description", e.target.value)}
                InputProps={{
                  style: {
                    fontSize: "14px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </div>
            <div className="mb-2">
              <span className="font-semibold text-lg text-gray-700">Status:</span>
              <Select
                value={task.status}
                onChange={(e) => handleEdit(task.id, "status", e.target.value)}
                size="small"
                fullWidth
                style={{
                  fontSize: "14px",
                  backgroundColor: "#f0f4f8",
                  borderRadius: "8px",
                  padding: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <IconButton
                color="error"
                onClick={() => onDelete(task.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
