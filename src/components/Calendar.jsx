import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [courses, setCourses] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    const fetchEventsAndCourses = async () => {
      try {
        const eventResponse = await axios.get(
          'http://localhost:3000/event/events'
        )

        const courseResponse = await axios.get('http://localhost:3000/courses')
        setEvents(eventResponse.data)
        setCourses(courseResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchEventsAndCourses()
  }, [])

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
      const eventDate = new Date(event.start).getDate()
      const eventMonth = new Date(event.start).getMonth()
      const eventYear = new Date(event.start).getFullYear()
      return (
        eventDate === day &&
        eventMonth === currentMonth.getMonth() &&
        eventYear === currentMonth.getFullYear()
      )
    })
  }

  const getDayCourses = (day) => {
    return courses.filter((course) => {
      const courseDate = new Date(course.lecturedate).getDate()
      const courseMonth = new Date(course.lecturedate).getMonth()
      const courseYear = new Date(course.lecturedate).getFullYear()
      return (
        courseDate === day &&
        courseMonth === currentMonth.getMonth() &&
        courseYear === currentMonth.getFullYear()
      )
    })
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
        >
          Previous Month
        </button>
        <h2>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
            )
          }
        >
          Next Month
        </button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day-name">Sun</div>
        <div className="calendar-day-name">Mon</div>
        <div className="calendar-day-name">Tue</div>
        <div className="calendar-day-name">Wed</div>
        <div className="calendar-day-name">Thu</div>
        <div className="calendar-day-name">Fri</div>
        <div className="calendar-day-name">Sat</div>

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="calendar-day empty"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          return (
            <div key={day} className="calendar-day">
              <span>{day}</span>
              {getDayCourses(day).map((course) => (
                <div key={course._id} className="event">
                  <strong>Course:</strong> {course.title}
                </div>
              ))}
              {getDayEvents(day).map((event) => (
                <div key={event.id} className="event">
                  <strong>Event:</strong> {event.title}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
