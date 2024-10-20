import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

const NewTask = ({ user }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [task, setTask] = useState({
    name: '',
    description: '',
    deadline: '',
    status: 'Pending',
    user: user ? user._id : '' // Assume task is linked to user
  })

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/tasks/${id}`)
          setTask(response.data)
        } catch (error) {
          console.error('Error fetching task details:', error)
        }
      }
      fetchTask()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prevTask) => ({ ...prevTask, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        // Update task
        await axios.put(`${BASE_URL}/tasks/${id}`, task)
        alert('Task updated successfully!')
      } else {
        // Create new task
        await axios.post(`${BASE_URL}/tasks`, task)
        alert('Task created successfully!')
      }
      navigate('/tasks') // Redirect after submission
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    )
    if (!confirmDelete) return

    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`)
      alert('Task deleted successfully!')
      navigate('/tasks')
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="new-task-form">
        <h1>{id ? 'Update Task' : 'New Task'}</h1>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button type="submit">{id ? 'Update' : 'Create'} Task</button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Task
          </button>
        )}
      </form>
    </div>
  )
}

export default NewTask
