import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignInUser } from "../services/Auth"
import { FaLocationArrow, FaLocationPin } from "react-icons/fa6"
import { FaFax, FaMailBulk, FaPhone } from "react-icons/fa"
import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

const LoginPage = ({ setUser, fetchUserSession }) => {
  let navigate = useNavigate()
  let initialState = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await SignInUser(formValues)
      setFormValues(initialState)
      setUser(payload)
      localStorage.setItem("user", JSON.stringify(payload))
      fetchUserSession()
      navigate("/")
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="form-container">
      <div className="right-side">
        <form onSubmit={handleSubmit} className="register-form">
          <h1 className="register-title">
            Welcome Back to LearnTech University!
          </h1>

          <div className="whyus">
            <div class="containers">
              <div class="card">
                <p class="title">About us</p>
                <div class="card-hidden">
                  <p class="title-in">
                    At Learn Tech University, we are dedicated to providing a
                    comprehensive and inclusive educational experience that
                    empowers students to reach their full potential. Our
                    university is committed to fostering a community of learners
                    who are passionate about technology and innovation. .
                  </p>
                </div>
              </div>
              <div class="card">
                <p class="title">Our mission</p>
                <div class="card-hidden">
                  <p class="title-in">
                    Our mission is to empower students to become innovative
                    leaders in the ever-evolving landscape of technology. We
                    strive to provide a transformative educational experience
                    that fosters intellectual curiosity, creativity, and
                    critical thinking.
                  </p>
                </div>
              </div>
              <div class="card">
                <p class="title">Contact us</p>
                <div class="card-hidden">
                  <p class="title-in">
                    <FaLocationArrow /> Location
                    <br></br>
                    Building 1306, Road 4625, Manama Sea Front, 346 Kingdom of
                    Bahrain P.O. Box 20525
                    <br></br>
                    <br></br>
                    <FaPhone /> Call
                    <br></br>
                    +973 1781 5555
                    <br></br>
                    <br></br>
                    <FaMailBulk /> Call
                    <br></br>
                    info@LearnTech.com
                    <br></br>
                    <br></br>
                    <FaFax /> Fax
                    <br></br>
                    +973 1772 9928
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="Login-box">
            <div className="input-wrapper">
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
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
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </Box>
            </div>
            <button type="submit" className="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
