import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000"

const CourseCard = ({ user, course, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const [requestStatus, setRequestStatus] = useState(null)
  const [isDropRequested, setIsDropRequested] = useState(false)
  const isAdmin = user && user.role === "admin"

  useEffect(() => {
    const fetchDropRequestStatus = () => {
      const userDropRequest = course.dropRequests.find(
        (request) => request.userId._id === user._id
      )

      if (userDropRequest) {
        setRequestStatus(userDropRequest.status)
        setIsDropRequested(true)
      }
    }

    fetchDropRequestStatus()
  }, [course.dropRequests, user._id])

  const handleDropRequest = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/course/${user.id}/${course._id}/drop`,
        {
          userId: user.id,
        }
      )
      setRequestStatus("pending")
    } catch (error) {
      setRequestStatus("Error sending request.")
    }
  }

  const handleShowDropRequests = () => {
    navigate(`/${course._id}/DropRequest`)
  }

  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <p className="course-lecture-date">Lecture Date: {course.lecturedate}</p>
      <p className="course-start-time">Start Time: {course.startTime}</p>
      <p className="course-end-time">End Time: {course.endTime}</p>
      <p className="course-end-time">
        Statuse : {requestStatus ? requestStatus : "Enrolled"}
      </p>

      <div className="course-actions">
        <button
          onClick={handleDropRequest}
          disabled={isDropRequested}
          style={{
            backgroundColor: isDropRequested ? "gray" : "", // Change color as needed
            color: "white",
            cursor: isDropRequested ? "not-allowed" : "pointer",
            opacity: isDropRequested ? 0.5 : 1,
          }}
        >
          {isDropRequested ? `Request ${requestStatus}` : "Drop Course"}
        </button>

        {isAdmin && (
          <button onClick={handleShowDropRequests}>Show Drop Requests</button>
        )}
        {isAdmin && <button onClick={() => onEdit(course)}>Edit</button>}
        {isAdmin && (
          <button onClick={() => onDelete(course._id)}>Delete</button>
        )}
      </div>
    </div>
  )
}

export default CourseCard
