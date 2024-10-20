import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CourseCard from '../components/courseCard'
const BASE_URL = 'http://localhost:3000'
import { Link } from "react-router-dom"
const CourseList = ({ user }) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, [])
  
  const getCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/course/courses`)
      setcourses(response.data)
    } catch (error) {
      console.error('Failed to fetch courses:', error)

    }
    
  }
  return (
    <div>
      <h1 className="courselist-title">Student courses</h1>
      <div className="courses">
        {courses.map((course) => (
          <div key={course._id}>
            <CourseCard course={course} user={user} setCourses={setCourses} />
          </div>
        ))}
      </div>
    </div>
  )}
  export default CourseList