import React from "react"
import { Link } from "react-router-dom"
import styles from "../css/task.module.css" // Import your CSS module

const TaskCard = ({ task }) => {
  return (
    <div className={styles.taskCard}>
      {" "}
      {/* Apply styles from the CSS module */}
      <h3>{task.name}</h3>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <Link to={`/tasks/${task._id}`} className={styles.viewDetailsButton}>
        {" "}
        {/* Use module styles */}
        View Details
      </Link>
    </div>
  )
}

export default TaskCard
