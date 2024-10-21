import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000"

const CreateCourseForm = () => {
  let navigate = useNavigate()

  // Form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [lecturedate, setLecturedate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  // Student selection
  const [studentsEnrolled, setStudentsEnrolled] = useState([]) // Selected students
  const [availableStudents, setAvailableStudents] = useState([]) // Students list from the backend

  // Fetch the list of students from the backend on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/users`)
        setAvailableStudents(response.data) // Assuming the data is an array of user objects
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
        lecturedate,
        startTime,
        endTime,
        studentsEnrolled, // Selected students (IDs)
      }
      await axios.post(`${BASE_URL}/course/courses`, formData)
      navigate("/courses")
    } catch (error) {
      console.error("Error creating course:", error)
    }
  }

  // Handle change in multi-select dropdown
  const handleStudentSelection = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setStudentsEnrolled(selectedOptions) // Array of selected student IDs
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
        <div>
          <label>Students Enrolled:</label>
          <select
            multiple
            value={studentsEnrolled}
            onChange={handleStudentSelection}
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
