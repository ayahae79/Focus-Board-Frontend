import "./App.css"
import { useState, useEffect } from "react"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

const App = () => {
  const [user, setUser] = useState({ data: null, role: null })

  const handleLogOut = () => {
    setUser({ data: null, role: null })
  }

  useEffect(() => {
    const checkToken = async () => {
      const userData = await CheckSession()
      setUser({ data: userData, role: userData.role })
    }
    checkToken()
  }, [])

  console.log(user)

  return (
    <div className="app-container">
      <div className="main-content">
        <Nav user={user.data} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
          </Routes>
        </main>
        <div className="footer">LearnTech University &copy;2024 </div>
      </div>
    </div>
  )
}




export default App
