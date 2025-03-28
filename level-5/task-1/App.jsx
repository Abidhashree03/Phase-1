import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks") // Make sure backend is running
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error fetching tasks:", err));
  }, []);

  // Add task to database
  const addTask = async () => {
    if (!title || !dueDate) {
      alert("Please enter a task title and due date.");
      return;
    }

    const newTask = { title, description, status, dueDate };

    try {
      const response = await fetch("http://localhost:5000/task_manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]); // Update state with database task
      } else {
        console.log("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }

    // Clear input fields
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setDueDate("");
  };

  return (
    <div className="container mt-5 p-4 rounded shadow bg-light">
      <h1 className="mb-4 text-center">Task Manager</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{task.title}</strong> - {task.description} <br />
              <small>
                Status: <b>{task.status}</b> | Due: <b>{task.dueDate}</b>
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
