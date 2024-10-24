import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../css/task.module.css"
const BASE_URL = "http://localhost:3000"

const NewEvent = ({ user }) => {
  const navigate = useNavigate()
  console.log(user)

  // State for event details
  const [name, setName] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [taskId, setTaskId] = useState("") // Single selected task

  // State for fetching tasks from the backend
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      if (user && user.id) {
        // Check if user and user.id are defined
        try {
          const response = await axios.get(
            `${BASE_URL}/user/myTasks/${user.id}`
          )
          setTasks(response.data.tasks)
        } catch (error) {
          console.error("Error fetching tasks:", error)
        }
      }
    }
    fetchTasks()
  }, [user])

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case "name":
        setName(value)
        break
      case "start":
        setStart(value)
        break
      case "end":
        setEnd(value)
        break
      case "task":
        setTaskId(value) // Set task id from dropdown
        break
      default:
        break
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newEvent = {
      name,
      start,
      end,
      task: taskId, // Associate the task by its id
      user: user.id, // Assuming user is passed as a prop with `user.id`
    }
    console.log(newEvent)

    try {
      const response = await axios.post(`${BASE_URL}/event/add`, newEvent)
      console.log("Event created:", response.data)
      // Redirect to some page after successful submission
      navigate("/events")
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  return (
    <div className={styles.newTaskContainer}>
      <h2 className={styles.newTaskTitle}>Create New Event</h2>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <div>
          <label htmlFor="name" className={styles.formLabel}>
            Event Name
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

        <div>
          <label htmlFor="start" className={styles.formLabel}>
            Start Date
          </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={start}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
        </div>

        <div>
          <label htmlFor="end" className={styles.formLabel}>
            End Date
          </label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={end}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
        </div>

        <div>
          <label htmlFor="task" className={styles.formLabel}>
            Associated Task
          </label>
          <select
            id="task"
            name="task"
            value={taskId}
            onChange={handleChange}
            className={styles.formInput}
            required
          >
            <option value="" className={styles.formGroup}>
              Select a Task
            </option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Event
        </button>
      </form>
    </div>
  )
}

export default NewEvent
