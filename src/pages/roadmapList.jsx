import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaPlus } from "react-icons/fa"
import RoadMapCard from "../components/roadMapCard"
import { useNavigate, Link } from "react-router-dom"

const BASE_URL = "http://localhost:3000"

const RoadmapList = ({ user }) => {
  const [roadmaps, setRoadmaps] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getRoadmaps()
  }, [user])

  const getRoadmaps = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/myRoadmaps/${user.id}`)
      setRoadmaps(response.data.roadmaps)
    } catch (error) {
      console.error("Failed to fetch roadmaps:", error)
    }
  }

  const handleDelete = async (roadmapId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this roadmap?"
    )
    if (!confirmDelete) return

    try {
      await axios.delete(`${BASE_URL}/roadmap/roadmap/${roadmapId}`)
      setRoadmaps(roadmaps.filter((roadmap) => roadmap._id !== roadmapId))
      alert("Roadmap deleted successfully!")
    } catch (error) {
      console.error("Error deleting roadmap:", error)
    }
  }

  return (
    <div>
      <div className="listheader">
        <h1 className="roadmaplist-title">Student Roadmaps</h1>
        <Link to="/roadmap/new" className="newButton">
          <FaPlus />
        </Link>
      </div>
      {roadmaps.length > 0 ? (
        <div className="roadmaps">
          {roadmaps.map((roadmap) => (
            <div key={roadmap._id}>
              <RoadMapCard roadmap={roadmap} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      ) : (
        <p>No roadmap available. Please create a roadmap.</p>
      )}
    </div>
  )
}

export default RoadmapList
