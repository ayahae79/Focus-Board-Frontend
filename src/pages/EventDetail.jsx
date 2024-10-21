import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/event/${id}`)
        setEvent(response.data)
      } catch (error) {
        console.error('Error fetching event details:', error)
      }
    }

    fetchEventDetails()
  }, [id])

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event?'
    )
    if (!confirmDelete) return

    try {
      await axios.delete(`${BASE_URL}/event/${id}`)
      alert('Event deleted successfully!')
      navigate('/events')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  if (!event) return <div>Loading...</div>

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <p>
        <strong>Start:</strong> {new Date(event.start).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong>{' '}
        {event.end ? new Date(event.end).toLocaleString() : 'N/A'}
      </p>
      <p>
        <strong>Task ID:</strong> {event.task}
      </p>
      <button
        onClick={() => navigate(`/events/edit/${event._id}`)}
        className="edit-button"
      >
        Edit Event
      </button>
      <button onClick={handleDelete} className="delete-button">
        Delete Event
      </button>
    </div>
  )
}

export default EventDetails
