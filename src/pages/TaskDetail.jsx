import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const TaskDetail = ({ user }) => {
  const { id } = useParams(); // Get task ID from URL params
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`); // Navigate to edit page
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
      alert("Task deleted successfully!");
      navigate("/tasks"); // Redirect to tasks list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-details">
      <h1>{task.name}</h1>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {task.status}</p>

      <button onClick={handleEdit} className="edit-button">Edit Task</button>
      <button onClick={handleDelete} className="delete-button">Delete Task</button>
    </div>
  );
};

export default TaskDetail;
