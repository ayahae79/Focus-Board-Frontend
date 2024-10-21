import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000"

const CreateRoadmapForm = ({ user }) => {
  let navigate = useNavigate()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [users, setUsers] = useState([])
  const fetchTasksAndCourses = async () => {
    try {
      const tasksResponse = await axios.get(`${BASE_URL}/tasks/tasks`)
      const coursesResponse = await axios.get(`${BASE_URL}/Course/courses`)
      setTasks(tasksResponse.data)
      setCourses(coursesResponse.data)
    } catch (error) {
      console.error("Error fetching tasks or courses:", error)
    }
  }

  // Call fetchTasksAndCourses when the component mounts
  useEffect(() => {
    fetchTasksAndCourses()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = {
        name,
        description,
        tasks: selectedTasks,
        courses: selectedCourses,
        user: user.id,
      }
      console.log(formData)

      await axios.post(`${BASE_URL}/roadmap/add`, formData)
      console.log("Roadmap saved")

      // Reset the state using the setter functions
      setName("")
      setDescription("")
      setSelectedTasks([])
      setSelectedCourses([])

      navigate("/roadmap")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1 className="newroadmap-title">New Roadmap</h1>
      <form onSubmit={handleSubmit} className="newroadmap-form">
        <div className="newroadmap-field">
          <label className="newroadmap-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(roadmap) => setName(roadmap.target.value)}
            className="newroadmap-input"
            required
          />
        </div>
        <div className="newroadmap-field">
          <label className="newroadmap-label">Description:</label>
          <textarea
            value={description}
            onChange={(roadmap) => setDescription(roadmap.target.value)}
            className="newroadmap-input"
            required
          />
        </div>
        <div className="newroadmap-field">
          <label className="newroadmap-label">Select Tasks:</label>
          <select
            multiple
            value={selectedTasks}
            onChange={(roadmap) => {
              const options = roadmap.target.options
              const value = []
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  value.push(options[i].value)
                }
              }
              setSelectedTasks(value)
            }}
            className="newroadmap-input"
          >
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.name} {/* Assuming tasks have a title field */}
              </option>
            ))}
          </select>
        </div>
        <div className="newroadmap-field">
          <label className="newroadmap-label">Select Courses:</label>
          <select
            multiple
            value={selectedCourses}
            onChange={(roadmap) => {
              const options = roadmap.target.options
              const value = []
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  value.push(options[i].value)
                }
              }
              setSelectedCourses(value)
            }}
            className="newroadmap-input"
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title} {/* Assuming courses have a title field */}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Roadmap</button>
      </form>
    </>
  )
}
export default CreateRoadmapForm
