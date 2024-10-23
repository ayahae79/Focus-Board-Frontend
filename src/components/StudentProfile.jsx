import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const BASE_URL = "http://localhost:3000"

const StudentProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    phone_number: "",
    student_id: "",
    major: "",
    year_of_study: "",
    gpa: "",
    academic_advisor: "",
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/user/${user.id}`)
        const userData = response.data

        // Populate formData with the user's current information
        setFormData({
          full_name: userData.full_name || "",
          date_of_birth: userData.date_of_birth
            ? userData.date_of_birth.split("T")[0]
            : "",
          phone_number: userData.phone_number || "",
          student_id: userData.student_id || "",
          major: userData.major || "",
          year_of_study: userData.year_of_study || "",
          gpa: userData.gpa || "",
          academic_advisor: userData.academic_advisor || "",
        })
      } catch (err) {
        setError("Error fetching user data.")
        console.error(err)
      }
    }

    if (user && user.id) {
      fetchUserData()
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send the updated profile data to the backend
      const response = await axios.put(`${BASE_URL}/user/profile`, {
        ...formData,
        userId: user.id, // Include the userId in the request
      })

      if (response.status === 200) {
        // If successful, navigate to the ProfileDisplay page
        navigate("/")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error updating profile")
    }
  }

  return (
    <div className="profile-container">
      <h1>Update Profile</h1>
      {error && <div className="profile-error">{error}</div>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <label className="profile-label">Full Name:</label>
        <input
          className="profile-input"
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
  
        <label className="profile-label">Date of Birth:</label>
        <input
          className="profile-input"
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
        />
  
        <label className="profile-label">Phone Number:</label>
        <input
          className="profile-input"
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
  
        <label className="profile-label">Student ID:</label>
        <input
          className="profile-input"
          type="text"
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
        />
  
        <label className="profile-label">Major:</label>
        <input
          className="profile-input"
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
        />
  
        <label className="profile-label">Year of Study:</label>
        <input
          className="profile-input"
          type="text"
          name="year_of_study"
          value={formData.year_of_study}
          onChange={handleChange}
        />
  
        <label className="profile-label">GPA:</label>
        <input
          className="profile-input"
          type="number"
          step="0.1"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
        />
  
        <label className="profile-label">Academic Advisor:</label>
        <input
          className="profile-input"
          type="text"
          name="academic_advisor"
          value={formData.academic_advisor}
          onChange={handleChange}
        />
  
        <button className="profile-button" type="submit">Update Profile</button>
      </form>
    </div>
  );}

export default StudentProfile
