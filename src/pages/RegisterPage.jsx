import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth"
import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

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
      <h1 className="register-title">Join LearnTech University!</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div class="register-box">
          <div className="input-wrapper">
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                id="outlined-basic"
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="rainbow-p-around_medium"
                value={formValues.username}
                required
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                id="outlined-basic"
                label="Email"
                name="email"
                type="email"
                placeholder="example@example.com"
                className="rainbow-p-around_medium"
                value={formValues.email}
                required
                variant="outlined"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formValues.password}
                required
              />
            </Box>
          </div>
        </div>
        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
