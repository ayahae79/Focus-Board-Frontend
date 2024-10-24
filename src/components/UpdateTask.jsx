import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import styles from "../css/task.module.css"

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
    <div className={styles.newTaskContainer}>
      <h1 className={styles.newTaskTitle}>Update Task</h1>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>
            Task Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="deadline" className={styles.formLabel}>
            Deadline:
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.formLabel}>
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
            className={styles.formSelect}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            {/* Add other status options as needed */}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Update Task
        </button>
      </form>
    </div>
  )
}

export default UpdateTask
