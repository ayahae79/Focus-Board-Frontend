import React from "react"

const RoadMapCard = ({ roadmap, onEdit, onDelete }) => {
  // Function to get course titles from the roadmap
  const getCourseTitles = (courses) => {
    return courses?.map((course) => course.title).join(", ") // Join titles with a comma
  }

  // Function to get task names from the roadmap
  const getTaskNames = (tasks) => {
    return tasks.map((task) => task.name).join(", ") // Join task names with a comma
  }

  return (
    <div className="roadmap-card">
      <h2 className="roadmap-title">{roadmap.name}</h2>
      <p className="roadmap-description">{roadmap.description}</p>
      <p className="roadmap-courses">
        <strong>Courses:</strong> {getCourseTitles(roadmap.courses)}
      </p>
      <p className="roadmap-tasks">
        <strong>Tasks:</strong> {getTaskNames(roadmap.tasks)}
      </p>

      <div className="roadmap-actions">
        <button onClick={() => onDelete(roadmap._id)}>Delete</button>
      </div>
    </div>
  )
}

export default RoadMapCard
