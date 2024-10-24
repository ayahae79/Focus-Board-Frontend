import React, { useState, useEffect } from "react"
import CourseDashboard from "../components/CourseDashboard"
import ToDo from "../components/ToDo"
import EventList from "./EventList"
import RoadmapList from "./roadmapList"
import TaskList from "./TaskList"
import SchedulePage from "./Schedule"

import axios from "axios"
const BASE_URL = "http://localhost:3000"
const Dashboard = ({ user, course, events, roadmaps, tasks }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <div className="dashboard">
      <h2 className="welcome">Welcome, {userData.full_name}!</h2>
      <div className="dashboard-container">
        <div className="dashboard-box">
        <SchedulePage user={user.data} />
        </div>
        <div className="dashboard-box">
          <ToDo user={user} />
          <EventList user={user} />
          <RoadmapList user={user} />
        </div>
       
      </div>
    </div>
  );
};
export default Dashboard
