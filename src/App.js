import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import FilterDropdown from "./components/FilterDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(""); // Filter by status
  const [search, setSearch] = useState(""); // Search by title or description

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const tasksWithStatus = response.data.slice(0, 20).map((task, index) => ({
          id: index + 1,
          title: task.title,
          description: "N/A",
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(tasksWithStatus);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); 
  }, []);

  // Handle task addition
  const handleAddTask = (newTask) => {
    newTask.id = tasks.length + 1;
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    const renumberedTasks = updatedTasks.map((task, index) => ({
      ...task,
      id: index + 1,
    }));
    setTasks(renumberedTasks);
    toast.success("Task deleted successfully!");
  };

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(
    (task) =>
      (filter ? task.status === filter : true) &&
      (task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Task List Manager</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 text-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Dropdown */}
        <FilterDropdown filter={filter} setFilter={setFilter} />

        {/* Task Table */}
        <TaskTable tasks={filteredTasks} onDelete={handleDeleteTask} />

        {/* Add Task Form */}
        <AddTaskForm onAdd={handleAddTask} />
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default App;
