import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import NewTask from './components/NewTask'
import Nav from './components/Nav'
import CourseDetails from './pages/courseDetails'
import CourseCard from './components/courseCard'
import CreateCourseForm from './components/Newcourse'
import CourseList from './pages/courseList'
import StudentProfile from './components/StudentProfile'
import ProfileDisplay from './pages/ProfileDisplay'
import UpdateTask from './components/UpdateTask'
import EventList from './pages/EventList' // Add EventList
import NewEvent from './components/NewEvent' // Add NewEvent
import { CheckSession } from './services/api'

const App = () => {
  const [user, setUser] = useState({ data: null, role: null })

  const handleLogOut = () => {
    setUser({ data: null, role: null })
    localStorage.removeItem('token')
  }

  const fetchUserSession = async () => {
    console.log('FETCHING USER SESSION!!!')
    try {
      const userData = await CheckSession()
      console.log('User Data:', userData) // Log the user data here
      if (userData) {
        setUser({ data: userData, role: userData.role })
      }
    } catch (error) {
      console.error('Error fetching user session:', error)
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
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/new" element={<NewTask user={user.data} />} />
            <Route
              path="/tasks/:id"
              element={<TaskDetail user={user.data} />}
            />
            <Route
              path="/tasks/edit/:id"
              element={<UpdateTask user={user.data} />}
            />
            <Route path="/courses" element={<CourseList user={user.data} />} />
            <Route
              path="/courses/:id"
              element={<CourseDetails user={user.data} />}
            />
            <Route path="/events" element={<EventList />} />{' '}
            {/* Add EventList route */}
            <Route
              path="/events/add"
              element={<NewEvent user={user.data} />}
            />{' '}
            {/* Add NewEvent route */}
            <Route path="/events/edit/:id" element={<NewEvent />} />{' '}
            <Route path="courses/createcourse" element={<CreateCourseForm />} />
            <Route path="user/profile" element={<StudentProfile />} />
            <Route path="/profile/data" element={<ProfileDisplay />} />
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
