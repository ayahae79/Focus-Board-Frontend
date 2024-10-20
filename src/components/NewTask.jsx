import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const BASE_URL = "http://localhost:3000" // Ensure this is the correct base URL for your API

const NewTask = ({ user }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "Pending",
    course: "",
    user: user ? user._id : "",
    event: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prevTask) => ({ ...prevTask, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(task)
      await axios.post(`${BASE_URL}/tasks/add`, task)
      navigate("/tasks")
    } catch (error) {
      console.error("Error saving the task:", error)
    }
  }

  return (
    <div>
      <h1>{id ? "Edit Task" : "Create New Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Task Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">{id ? "Update Task" : "Create Task"}</button>
      </form>
    </div>
  )
}

export default NewTask
