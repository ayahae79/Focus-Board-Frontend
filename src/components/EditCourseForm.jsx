// EditCourseForm.jsx
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

const EditCourseForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { course } = location.state // Get course from location state

  const [title, setTitle] = useState(course.title)
  const [description, setDescription] = useState(course.description)
  const [lecturedate, setLecturedate] = useState(course.lecturedate)
  const [startTime, setStartTime] = useState(course.startTime)
  const [endTime, setEndTime] = useState(course.endTime)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = { title, description, lecturedate, startTime, endTime }
      await axios.put(`${BASE_URL}/course/courses/${course._id}`, formData)
      navigate('/courses')
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  return (
    <div>
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Lecture Date:</label>
          <input
            type="date"
            value={lecturedate}
            onChange={(e) => setLecturedate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  )
}

export default EditCourseForm
