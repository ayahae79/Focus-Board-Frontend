import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth"
import background from "../assets/Background2.jpg"
// import "../css/RegisterPage.css"

const RegisterPage = () => {
  let navigate = useNavigate()
  const initialState = {
    username: "",
    email: "",
    password: "",
  }
  const [formValues, setFormValues] = useState(initialState)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await RegisterUser(formValues)
      setFormValues(initialState)
      navigate("/")
    } catch (error) {
      setError("Registration failed! Please try again.")
    }
  }

  return (
    <div className="form-container">
      <div className="left-side">
        <img src={background} alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <form onSubmit={handleSubmit} className="register-form">
          <h1 className="register-title">Join the Wonka Adventure!</h1>
          <div className="input-wrapper">
            <span className="material-icons input-icon">person</span>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="material-icons input-icon">email</span>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="material-icons input-icon">lock</span>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formValues.password}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
