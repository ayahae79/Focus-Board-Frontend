import React from "react"
import { Link } from "react-router-dom"

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <Link to={`/tasks/${task._id}`} className="view-details-button">
        View Details
      </Link>
    </div>
  )
}

export default TaskCard
