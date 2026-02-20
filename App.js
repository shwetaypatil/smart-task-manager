import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState({});

  const API_URL = "http://127.0.0.1:5000";

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    setTasks(response.data);
  };

  // Fetch summary
  const fetchSummary = async () => {
    const response = await axios.get(`${API_URL}/summary`);
    setSummary(response.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchSummary();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    await axios.post(`${API_URL}/tasks`, { title });

    setTitle("");
    fetchTasks();
    fetchSummary();
  };

  //complete task
  const toggleComplete = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";

    await axios.put(`${API_URL}/tasks/${task.id}`, {
      status: newStatus,
    });

    fetchTasks();
    fetchSummary();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
    fetchSummary();
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="brand">
          <div className="logo">STM</div>
          <div>
            <p className="eyebrow">Smart Task Manager</p>
            <h1>Build momentum, one task at a time.</h1>
            <p className="subtext">
              A calm space to capture tasks, track progress, and ship.
            </p>
          </div>
        </div>

        <div className="stats">
          <div className="stat-card total">
            <span>Total</span>
            <strong>{summary.total ?? 0}</strong>
          </div>
          <div className="stat-card completed-box">
            <span>Completed</span>
            <strong>{summary.completed ?? 0}</strong>
          </div>
          <div className="stat-card pending">
            <span>Pending</span>
            <strong>{summary.pending ?? 0}</strong>
          </div>
        </div>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Tasks</h2>
            <p>Tap a task to toggle completion.</p>
          </div>
          <div className="progress-pill">
            {summary.completed ?? 0} / {summary.total ?? 0} done
          </div>
        </div>

        <div className="input-card">
          <label className="visually-hidden" htmlFor="taskInput">
            Task title
          </label>
          <input
            id="taskInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done next?"
          />
          <button className="add-btn" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks yet</h3>
              <p>Add your first task and keep the momentum going.</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                className={`task-card ${
                  task.status === "Completed" ? "is-complete" : ""
                }`}
                style={{ "--i": index }}
              >
                <div className="task-main">
                  <span
                    className={`task-title ${
                      task.status === "Completed" ? "completed" : ""
                    }`}
                    onClick={() => toggleComplete(task)}
                    style={{ cursor: "pointer" }}
                  >
                    {task.title}
                  </span>
                  <span
                    className={`task-chip ${
                      task.status === "Completed" ? "done" : "todo"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
