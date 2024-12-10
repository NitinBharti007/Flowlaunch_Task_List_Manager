import React, { useState } from "react";

const AddTaskForm = ({ onAdd }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.description) {
      onAdd(newTask);
      setNewTask({
        title: "",
        description: "",
        status: "To Do",
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-blue-700 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-semibold">Description</label>
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-semibold">Status</label>
        <select
          name="status"
          value={newTask.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
