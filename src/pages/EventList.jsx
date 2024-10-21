import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard' // Ensure this path is correct

const BASE_URL = 'http://localhost:3000'

const EventList = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events`)
      console.log(response)
      setEvents(response.data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  return (
    <div>
      <h1 className="eventlist-title">Event List</h1>
      <Link to="/events/add" className="new-event-button">
        Create New Event
      </Link>
      <div className="events">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id}>
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p>No events available. Please create an event.</p>
        )}
      </div>
    </div>
  )
}

export default EventList
