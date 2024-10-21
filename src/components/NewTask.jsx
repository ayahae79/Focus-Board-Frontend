import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000" // Ensure this is the correct base URL for your API

const NewTask = ({ user }) => {
  const navigate = useNavigate()

  // Define state variables for the form fields
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [status, setStatus] = useState("Pending")

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
      case "user":
        setTaskUser(value)
        break
      default:
        break
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = {
        name,
        description,
        deadline,
        status,
        user: user.id,
      }

      console.log("Submitting task:", formData)
      await axios.post(`${BASE_URL}/tasks/add`, formData)
      navigate("/tasks")
    } catch (error) {
      console.error("Error saving the task:", error)
    }
  }

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Task Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select name="status" value={status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewTask
