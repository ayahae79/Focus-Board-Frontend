import React from "react"

const CourseCard = ({ user, course, onEdit, onDelete }) => {
  // Check if lectureSchedule exists and has at least one item
  const isAdmin = user && user.role === "admin"
  const hasLectureSchedule =
    course.lectureSchedule && course.lectureSchedule.length > 0

  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <p className="course-lecture-date">Lecture Date: {course.lecturedate}</p>
      <p className="course-start-time">Start Time: {course.startTime}</p>
      <p className="course-end-time">End Time: {course.endTime}</p>

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
