import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import userImg from "../images/user.jpg"

const BASE_URL = "http://localhost:3000"

const ProfileDisplay = ({ user }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/user/${user.id}`)
        console.log("Fetched user data:", response.data)
        setUserData(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!userData) {
    return <div>No user data available.</div>
  }
  return (
    <div className="containerprofile">
      <div className="title-box">
        <h1>Profile Details</h1>
      </div>

      <div className="profile-header">
        <img src={userImg} alt="User  Profile" className="profile-picture" />
        <div className="profile-info">
          <h3>{userData.full_name}</h3>
          <p>{userData.email}</p>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-info">
          <strong>Username:</strong> <span>{userData.username}</span>
        </div>
        <div className="profile-info">
          <strong>Date of Birth:</strong>{" "}
          <span>{new Date(userData.date_of_birth).toLocaleDateString()}</span>
        </div>
        <div className="profile-info">
          <strong>Phone Number:</strong> <span>{userData.phone_number}</span>
        </div>
        <div className="profile-info">
          <strong>Student ID:</strong> <span>{userData.student_id}</span>
        </div>
        <div className="profile-info">
          <strong>Major:</strong> <span>{userData.major}</span>
        </div>
        <div className="profile-info">
          <strong>Year of Study:</strong> <span>{userData.year_of_study}</span>
        </div>
        <div className="profile-info">
          <strong>GPA:</strong> <span>{userData.gpa}</span>
        </div>
        <div className="profile-info">
          <strong>Academic Advisor:</strong>{" "}
          <span>{userData.academic_advisor}</span>
        </div>
        <div className="update">
          <button onClick={() => navigate("/profile")} className="button">
            Update Profile
          </button>
        </div>{" "}
      </div>
    </div>
  )
}
export default ProfileDisplay
