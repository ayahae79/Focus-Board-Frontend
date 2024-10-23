import React from 'react'
import { Link } from 'react-router-dom'


const TaskCard = ({ task }) => {
  let completionPercentage = 0
  let progressBarColor = ''

  // Set percentage and color based on status
  if (task.status === 'Pending') {
    completionPercentage = 25
    progressBarColor = 'red'
  } else if (task.status === 'In Progress') {
    completionPercentage = 50
    progressBarColor = 'blue'
  } else if (task.status === 'Completed') {
    completionPercentage = 100
    progressBarColor = 'green'
  }

  return (
    <div className="taskcard">
      <h3 className="task-title">{task.name}</h3>
      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${completionPercentage}%`,
            backgroundColor: progressBarColor
          }}
        >
          {completionPercentage}%
        </div>
      </div>

      <Link to={`/tasks/${task._id}`} className="view-details-button">
        View Details
      </Link>

      <span className={`status-pill ${task.status.toLowerCase()}`}>
        {task.status}
      </span>

      {task.priority && (
        <span className="priority-badge">Priority: {task.priority}</span>
      )}
    </div>
  )
}

export default TaskCard
