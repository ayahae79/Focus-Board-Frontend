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
  }, [])

  const getCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/course/courses`)
      setCourses(response.data)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    }
  }

  const handleEdit = (course) => {
    navigate("/courses/createcourse", { state: { course } })
  }

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    )
    if (!confirmDelete) return

    try {
      await axios.delete(`${BASE_URL}/course/courses/${courseId}`)
      setCourses(courses.filter((course) => course._id !== courseId))
      alert("Course deleted successfully!")
    } catch (error) {
      console.error("Error deleting course:", error)
    }
  }

  return (
    <div>
      <h1 className="courselist-title">Student Courses</h1>
      <div className="courses">
        {courses.map((course) => (
          <div key={course._id}>
            <CourseCard
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList
