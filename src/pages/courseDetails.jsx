import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

const CreateCourseForm = () => {
  let navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [lecturedate, setLecturedate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/users`) // Adjust the endpoint as necessary
        console.log('Fetched Users:', response.data) // Log the response
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleUserChange = (event) => {
    const options = event.target.options
    const values = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value)
      }
    }
    setSelectedUsers(values)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = {
        title,
        description,
        lecturedate,
        startTime,
        endTime,
        studentsEnrolled: selectedUsers // Include selected users
      }
      await axios.post(`${BASE_URL}/Course/courses`, formData)
      console.log('Course saved')

      // Reset the state
      setTitle('')
      setDescription('')
      setLecturedate('')
      setStartTime('')
      setEndTime('')
      setSelectedUsers([])

      navigate('/courses')
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  return (
    <>
      <h1 className="newcourse-title">New Course</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <form onSubmit={handleSubmit} className="newcourse-form">
          <div className="newcourse-field">
            <label className="newcourse-label">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="newcourse-input"
              required
            />
          </div>
          <div className="newcourse-field">
            <label className="newcourse-label">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="newcourse-input"
              required
            />
          </div>
          <div className="newcourse-field">
            <label className="newcourse-label">Lecture Date:</label>
            <input
              type="date"
              value={lecturedate}
              onChange={(event) => setLecturedate(event.target.value)}
              className="newcourse-input"
              required
            />
          </div>
          <div className="newcourse-field">
            <label className="newcourse-label">Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className="newcourse-input"
              required
            />
          </div>
          <div className="newcourse-field">
            <label className="newcourse-label">End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              className="newcourse-input"
              required
            />
          </div>
          <div className="newcourse-field">
            <label className="newcourse-label">Select Users:</label>
            <select
              multiple
              value={selectedUsers}
              onChange={handleUserChange}
              className="newcourse-input"
              required
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.full_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Course</button>
        </form>
      )}
    </>
  )
}

export default CreateCourseForm
