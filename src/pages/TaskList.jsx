import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard"; 
import axios from "axios";
import { Link } from "react-router-dom";


const BASE_URL = "http://localhost:3000";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <div>
      <h1 className="tasklist-title">Task List</h1>
      <Link to="/tasks/new" className="new-task-button">Create New Task</Link>
      <div className="tasks">
        {tasks.map((task) => (
          <div key={task._id}>
            <TaskCard task={task} /> {/* Ensure this component displays task details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
