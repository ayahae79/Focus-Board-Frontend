import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

const EditCourseForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { course } = location.state

  const [title, setTitle] = useState(course.title)
  const [description, setDescription] = useState(course.description)
  const [startTime, setStartTime] = useState(course.startTime)
  const [endTime, setEndTime] = useState(course.endTime)
  const [selectedDays, setSelectedDays] = useState(course.lectureDays || [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = {
        title,
        description,
        lectureDays: selectedDays,
        startTime,
        endTime
      }
      await axios.put(`${BASE_URL}/course/courses/${course._id}`, formData)
      navigate('/courses')
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  const handleDaySelection = (e) => {
    const value = e.target.value
    setSelectedDays((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    )
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div>
          <label>Select Lecture Days:</label>
          {[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ].map((day) => (
            <div key={day}>
              <input
                type="checkbox"
                value={day}
                checked={selectedDays.includes(day)}
                onChange={handleDaySelection}
              />
              <label>{day}</label>
            </div>
          ))}
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  )
}

export default EditCourseForm
