import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../css/task.module.css"
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
      <h1 className={styles.newTaskTitle}>Create Course</h1>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <div>
          <label className={styles.formLabel}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label className={styles.formLabel}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label className={styles.formLabel}>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label className={styles.formLabel}>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label className={styles.formLabel}>Select Lecture Days:</label>
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
                className={styles.formInput}
              />
              <label>{day}</label>
            </div>
          ))}
        </div>
        <div>
          <label className={styles.formLabel}>Students Enrolled:</label>
          <select
            multiple
            value={studentsEnrolled}
            className={styles.formSelect}
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
        <button type="submit" className={styles.submitButton}>
          Create Course
        </button>
      </form>
    </div>
  )
}

export default CreateCourseForm
