import React from "react"
import { Link } from "react-router-dom"

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>
        <strong>Start:</strong> {new Date(event.start).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong>{" "}
        {event.end ? new Date(event.end).toLocaleString() : "N/A"}
      </p>
      <p>
        <strong>Task: </strong> {event.task.name}
        {/* Assuming event.task is an object */}
      </p>
      <Link to={`/events/${event._id}`} className="view-details-button">
        View Details
      </Link>
    </div>
  )
}

export default EventCard
