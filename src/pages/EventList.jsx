import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"

const BASE_URL = "http://localhost:3000"

const EventList = ({ user }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [user])

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/myEvents/${user.id}`)
      console.log(response)
      setEvents(response.data.event)
    } catch (error) {
      console.error("Failed to fetch events:", error.response || error.message)
    }
  }

  return (
    <div>
      <h1 className="eventlist-title">Event List</h1>
      <Link to="/events/add" className="newButton">
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
