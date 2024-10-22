import React, { useState, useEffect } from "react"
import axios from "axios"

const BASE_URL = "http://localhost:3000"

const Calendar = ({ user }) => {
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/myEvents/${user.id}`)
      setEvents(response.data.event)
    } catch (error) {
      console.error("Failed to fetch events:", error.response || error.message)
    }
  }

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const getDayEvents = (day) => {
    return events.filter((event) => {
      const eventStartDate = new Date(event.start)
      const eventEndDate = event.end ? new Date(event.end) : eventStartDate
      const eventDay = eventStartDate.getDate()
      return (
        eventStartDate.getFullYear() === currentMonth.getFullYear() &&
        eventStartDate.getMonth() === currentMonth.getMonth() &&
        day >= eventStartDate.getDate() &&
        day <= eventEndDate.getDate()
      )
    })
  }

  const renderDays = () => {
    const days = []
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getDayEvents(day)

      days.push(
        <div key={day} className="calendar-day">
          <span>{day}</span>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="event"
              style={{
                gridColumn: `span ${
                  new Date(event.end).getDate() -
                  new Date(event.start).getDate() +
                  1
                }`,
              }}
            >
              <strong>{event.name}</strong>
            </div>
          ))}
        </div>
      )
    }

    return days
  }
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          className="month-button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
        >
          Previous Month
        </button>

        <h2 className="month-title">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>

        <button
          className="month-button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
            )
          }
        >
          Next Month
        </button>
      </div>

      {/* Day Names */}
      <div className="calendar-grid">
        <div className="calendar-day-name">Sun</div>
        <div className="calendar-day-name">Mon</div>
        <div className="calendar-day-name">Tue</div>
        <div className="calendar-day-name">Wed</div>
        <div className="calendar-day-name">Thu</div>
        <div className="calendar-day-name">Fri</div>
        <div className="calendar-day-name">Sat</div>

        {/* Render Days */}
        {renderDays()}
      </div>
    </div>
  )
}

export default Calendar
