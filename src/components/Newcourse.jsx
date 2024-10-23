import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000"

const CreateCourseForm = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [studentsEnrolled, setStudentsEnrolled] = useState([])
  const [availableStudents, setAvailableStudents] = useState([])
  const [selectedDays, setSelectedDays] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/users`)
        setAvailableStudents(response.data)
      } catch (error) {
        console.error("Error fetching students:", error)
      }
    }
    fetchStudents()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = {
        title,
        description,
        lectureDays: selectedDays, // Include selected weekdays
        startTime,
        endTime,
        studentsEnrolled,
      }
      await axios.post(`${BASE_URL}/course/courses`, formData)
      navigate("/courses")
    } catch (error) {
      console.error("Error creating course:", error)
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
      <h1>Create Course</h1>
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
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
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
        <div>
          <label>Students Enrolled:</label>
          <select
            multiple
            value={studentsEnrolled}
            onChange={(e) =>
              setStudentsEnrolled(
                [...e.target.selectedOptions].map((option) => option.value)
              )
            }
          >
            {availableStudents.map((student) => (
              <option key={student._id} value={student._id}>
                {student.full_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  )
}

export default CreateCourseForm
