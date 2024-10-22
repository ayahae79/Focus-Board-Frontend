import React from 'react'

const CourseCard = ({ user, course, onEdit, onDelete }) => {
  const isAdmin = user && user.role === 'admin'

  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <p className="course-start-time">Start Time: {course.startTime}</p>
      <p className="course-end-time">End Time: {course.endTime}</p>

      {course.lectureDays && course.lectureDays.length > 0 && (
        <div className="lecture-schedule">
          <h3>Lecture Days:</h3>
          <ul>
            {course.lectureDays.map((day, index) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="course-actions">
        {isAdmin && <button onClick={() => onEdit(course)}>Edit</button>}
        {isAdmin && (
          <button onClick={() => onDelete(course._id)}>Delete</button>
        )}
      </div>
    </div>
  )
}

export default CourseCard
