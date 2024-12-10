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
        const initialTasks = response.data.slice(0, 20).map((task, index) => ({
          id: index + 1,
          title: task.title,
          description: "N/A", // Adding a dummy description
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(initialTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handle task addition
  const handleAddTask = (newTask) => {
    newTask.id = tasks.length + 1; // Dynamically assign new ID
    setTasks([...tasks, newTask]); // Add task to the list
    toast.success("Task added successfully!");
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    const renumberedTasks = updatedTasks.map((task, index) => ({
      ...task,
      id: index + 1,
    }));
    setTasks(renumberedTasks); // Update tasks with renumbered IDs
    toast.success("Task deleted successfully!");
  };

  // Handle task editing
  // Handle task editing
const handleEditTask = (updatedTask) => {
  const updatedTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  setTasks(updatedTasks); // Update the tasks state with the edited task
  toast.success("Task updated successfully!"); // Optional toast for feedback
};

  

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(
    (task) =>
      (filter ? task.status === filter : true) &&
      (task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Task List Manager</h1>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          className="w-full p-2 border rounded-md mb-4"
        />
        {/* Filter Dropdown */}
        <FilterDropdown filter={filter} setFilter={setFilter} />
        {/* Task Table */}
        <TaskTable tasks={filteredTasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        {/* Add Task Form */}
        <AddTaskForm onAdd={handleAddTask} />
      </div>
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
