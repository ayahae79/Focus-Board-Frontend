import React from "react"

const CourseCard = ({ course, onEdit, onDelete }) => {
  // Check if lectureSchedule exists and has at least one item
  const hasLectureSchedule =
    course.lectureSchedule && course.lectureSchedule.length > 0

  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <p className="course-lecture-date">Lecture Date: {course.lecturedate}</p>
          <p className="course-start-time">Start Time: {course.startTime}</p>
          <p className="course-end-time">
            End Time: {course.endTime}
          </p>
        
      <div className="course-actions">
        <button onClick={() => onEdit(course)}>Edit</button>
        <button onClick={() => onDelete(course._id)}>Delete</button>
      </div>
    </div>
  )
}

export default CourseCard
