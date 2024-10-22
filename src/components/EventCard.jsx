import React from "react"
import { Link } from "react-router-dom"

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <Link to={`/events/${event._id}`} className="view-details-button">
        View Details
      </Link>
    </div>
  )
}

export default EventCard
