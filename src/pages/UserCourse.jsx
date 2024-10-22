import React, { useState, useEffect } from "react"
import axios from "axios"
import CourseCard from "../components/courseCard"
import { useNavigate } from "react-router-dom"
const BASE_URL = "http://localhost:3000"

const CourseList = ({ user }) => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getCourses()
  }, [user])

  const getCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/myCourses/${user.id}`)
      setCourses(response.data.courses)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    }
  }

  const handleEdit = (course) => {
    navigate("/courses/edit", { state: { course } })
  }

  return (
    <div>
      <h1 className="courselist-title">Student Courses</h1>
      <div className="courses">
        {courses.map((course) => (
          <div key={course._id}>
            <CourseCard user={user} course={course} onEdit={handleEdit} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList
