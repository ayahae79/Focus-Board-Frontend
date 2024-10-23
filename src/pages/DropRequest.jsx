import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const DropRequest = () => {
  const { id } = useParams() // Get the course ID from the URL
  const [dropRequests, setDropRequests] = useState([])

  useEffect(() => {
    const fetchDropRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/course/${id}/drop-requests`
        )
        setDropRequests(response.data)
      } catch (error) {
        console.error("Error fetching drop requests", error)
      }
    }

    fetchDropRequests()
  }, [id])

  return (
    <div>
      <h1>Drop Requests for Course ID: {id}</h1>
      {dropRequests.length === 0 ? (
        <p>No drop requests available.</p>
      ) : (
        <ul>
          {dropRequests.map((request) => (
            <li key={request._id}>
              Request from:
              <p>User: {request.userId.full_name}</p>
              <p>Status: {request.status}</p>
              <button onClick={() => handleApprove(request._id)}>
                Approve
              </button>
              <button onClick={() => handleReject(request._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropRequest
