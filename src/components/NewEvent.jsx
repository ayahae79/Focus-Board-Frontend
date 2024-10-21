import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

const NewEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams() // Get the event ID if available
  const [event, setEvent] = useState({
    name: '',
    start: '',
    end: '',
    task: ''
  })

  useEffect(() => {
    if (id) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/event/${id}`)
          setEvent(response.data)
        } catch (error) {
          console.error('Error fetching event details:', error)
        }
      }
      fetchEventDetails()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        // Update existing event
        await axios.put(`${BASE_URL}/event/${id}`, event)
      } else {
        // Create new event
        await axios.post(`${BASE_URL}/events/add`, event)
      }
      navigate('/events') // Redirect after saving
    } catch (error) {
      console.error('Failed to save the event:', error)
    }
  }

  return (
    <div>
      <h1>{id ? 'Edit Event' : 'Create New Event'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start Date:</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={event.start}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end">End Date:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={event.end}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="task">Task ID:</label>
          <input
            type="text"
            id="task"
            name="task"
            value={event.task}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Update Event' : 'Create Event'}</button>
      </form>
    </div>
  )
}

export default NewEvent
