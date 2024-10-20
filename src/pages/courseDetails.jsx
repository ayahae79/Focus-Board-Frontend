import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
const BASE_URL = "http://localhost:3000"
const CourseDetails = ({ user }) => {
  const { id } = useParams() 
  const coursesId = id

  const [courseDetails, setCourseDetails] = useState({})
  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/course/courses/${coursesId}`)
        setCourseDetails(response.data)
      } catch (error) {
        console.error("Error fetching coursedetails:", error)
      }
    }
    fetchCourseDetails()
  },[coursesId])
  return(
    <div>
    <h1>{courseDetails.title}</h1> 
    <p>
        <strong>Description:</strong> {courseDetails.descrption}
      </p>
      <p>
        <strong>Date:</strong> {courseDetails.lecturedate}
      </p>
      <p>
        <strong>Start Time:</strong> {courseDetails.startTime}
      </p>
      <p>
        <strong>End Time:</strong> {courseDetails.endTime}
      </p>
      </div>
  )
}
export default CourseDetails
