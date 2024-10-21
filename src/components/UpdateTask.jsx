import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const BASE_URL = "http://localhost:3000" // Ensure this is the correct base URL for your API

const UpdateTask = ({ user }) => {
  const navigate = useNavigate()
  const { id } = useParams() // Get task ID from URL parameters

  // Define state variables for the form fields
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [status, setStatus] = useState("Pending")

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tasks/tasks/${id}`)
        const task = response.data

        setName(task.name)
        setDescription(task.description)
        setDeadline(task.deadline.split("T")[0])
        setStatus(task.status)
      } catch (error) {
        console.error("Error fetching task details:", error)
      }
    }

    fetchTask()
  }, [id])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case "name":
        setName(value)
        break
      case "description":
        setDescription(value)
        break
      case "deadline":
        setDeadline(value)
        break
      case "status":
        setStatus(value)
        break
      default:
        break
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedTask = {
        name,
        description,
        deadline,
        status,
        user: user ? user._id : "", // Ensure user is associated with the task
      }

      await axios.put(`${BASE_URL}/tasks/tasks/${id}`, updatedTask)
      navigate("/tasks") // Redirect to the task list after updating
    } catch (error) {
      console.error("Error updating the task:", error)
    }
  }

  return (
    <div>
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Task Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            {/* Add other status options as needed */}
          </select>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  )
}

export default UpdateTask
