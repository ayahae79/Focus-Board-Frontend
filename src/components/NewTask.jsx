import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/NewTask.css"; // Add your CSS file for styles

const BASE_URL = "http://localhost:3000";

const NewTask = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get task ID from URL if updating
  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "Pending",
    course: "",
    user: user ? user._id : "", // Assuming user ID is passed as prop
    event: "",
  });

  useEffect(() => {
    // If ID is present, fetch the task details for updating
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/tasks/${id}`);
          setTask(response.data);
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update task
        await axios.put(`${BASE_URL}/tasks/${id}`, task);
        alert("Task updated successfully!");
      } else {
        // Create new task
        await axios.post(`${BASE_URL}/tasks`, task);
        alert("Task created successfully!");
      }
      navigate("/tasks"); // Redirect after submission
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <h1>{id ? "Update Task" : "New Task"}</h1>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Deadline:
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Status:
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <button type="submit">{id ? "Update" : "Create"} Task</button>
    </form>
  );
};

export default NewTask;
