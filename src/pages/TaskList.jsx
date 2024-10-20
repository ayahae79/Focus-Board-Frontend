import React, { useState, useEffect } from "react"
import TaskCard from "../components/TaskCard"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "../css/task.module.css" // Adjust the path as necessary

const BASE_URL = "http://localhost:3000"

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/tasks`)
      setTasks(response.data)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    }
  }

  return (
    <div className={styles.tasklistContainer}>
      <h1 className={styles.tasklistTitle}>Task List</h1>
      <Link to="/tasks/new" className={styles.newTaskButton}>
        Create New Task
      </Link>
      <div className={styles.tasks}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id}>
              <TaskCard task={task} />{" "}
              {/* Ensure this component displays task details */}
            </div>
          ))
        ) : (
          <p>No tasks available. Please create a task.</p>
        )}
      </div>
    </div>
  )
}

export default TaskList
