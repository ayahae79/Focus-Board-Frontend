import "./App.css"
import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { CheckSession } from "./services/api"
// user imports
import Nav from "./components/Nav"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import StudentProfile from "./components/StudentProfile"
import ProfileDisplay from "./pages/ProfileDisplay"
// tasks imports
import TaskList from "./pages/TaskList"
import TaskDetail from "./pages/TaskDetail"
import NewTask from "./components/NewTask"
import UpdateTask from "./components/UpdateTask"
// course imports
import CourseDetails from "./pages/courseDetails"
import CreateCourseForm from "./components/Newcourse"
import CourseList from "./pages/courseList"
import EditCourseForm from "./components/EditCourseForm"
import UserCourse from "./pages/UserCourse"
// event imports
import EventList from "./pages/EventList"
import NewEvent from "./components/NewEvent"
import EventDetails from "./pages/EventDetail"
// roadmap imports
import CreateRoadmapForm from "./components/newRoadmap"
import RoadmapList from "./pages/roadmapList"
// Drop Requests import
import DropRequest from "./pages/DropRequest"
// Import the Calendar component
import Calendar from "./components/Calendar"

const App = () => {
  const [user, setUser] = useState({ data: null, role: null })

  const handleLogOut = () => {
    setUser({ data: null, role: null })
    localStorage.removeItem("token")
  }

  const fetchUserSession = async () => {
    console.log("FETCHING USER SESSION!!!")
    try {
      const userData = await CheckSession()
      if (userData) {
        setUser({ data: userData, role: userData.role })
        console.log(userData.role)
      }
    } catch (error) {
      console.error("Error fetching user session:", error)
    }
  }

  useEffect(() => {
    fetchUserSession()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <Nav user={user.data} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            {/* User routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setUser={setUser}
                  fetchUserSession={fetchUserSession}
                />
              }
            />
            <Route
              path="/profile"
              element={<StudentProfile user={user.data} />}
            />
            <Route
              path="/profile/data"
              element={<ProfileDisplay user={user.data} />}
            />
            {/* Calendar route */}
            <Route path="/calendar" element={<Calendar user={user.data} />} />
            {/* Task routes */}
            <Route path="/tasks" element={<TaskList user={user.data} />} />
            <Route path="/tasks/new" element={<NewTask user={user.data} />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route
              path="/tasks/edit/:id"
              element={<UpdateTask user={user.data} />}
            />
            {/* Course routes */}
            <Route path="/courses" element={<CourseList user={user.data} />} />
            <Route
              path="/mycourses"
              element={<UserCourse user={user.data} />}
            />
            <Route
              path="/courses/:id"
              element={<CourseDetails user={user.data} />}
            />
            <Route
              path="/courses/edit"
              element={<EditCourseForm user={user.data} />}
            />
            <Route
              path="/courses/createcourse"
              element={<CreateCourseForm />}
            />
            {/* Drop Requests route */}

            <Route path="/:id/DropRequest" element={<DropRequest />} />

            {/* Roadmap routes */}
            <Route path="/roadmap" element={<RoadmapList user={user.data} />} />
            <Route
              path="/roadmap/new"
              element={<CreateRoadmapForm user={user.data} />}
            />
            {/* Events routes */}
            <Route path="/events" element={<EventList user={user.data} />} />
            <Route path="/events/add" element={<NewEvent user={user.data} />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>
              &copy; {new Date().getFullYear()} LearnTech University. All Rights
              Reserved. Terms of Service | Privacy Policy
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
