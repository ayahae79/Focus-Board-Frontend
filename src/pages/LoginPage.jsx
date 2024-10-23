import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import { Link } from 'react-router-dom'

const LoginPage = ({ setUser, fetchUserSession }) => {
  let navigate = useNavigate()
  let initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await SignInUser(formValues)
      setFormValues(initialState)
      setUser(payload)
      localStorage.setItem('user', JSON.stringify(payload))
      fetchUserSession()
      navigate('/Dashboard')
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="form-container">
      <div className="right-side">
        <form onSubmit={handleSubmit} className="register-form">
          <h1 className="register-title">
            Welcome Back to LearnTech University!
          </h1>
          <div className='whyus'>
          <div class="containers">
      <div class="card">
          <p class="title">About us</p>
          <div class="card-hidden">
              <p class="title-in">At Learn Tech University, we are dedicated to providing a comprehensive and inclusive educational experience that empowers students to reach their full potential. Our university is committed to fostering a community of learners who are passionate about technology and innovation. .</p>
              
          </div>

      </div>
      <div class="card">
  <p class="title">Our mission</p>
  <div class="card-hidden">
    <p class="title-in">Our mission is to empower students to become innovative leaders in the ever-evolving landscape of technology. We strive to provide a transformative educational experience that fosters intellectual curiosity, creativity, and critical thinking.</p>
  </div>

      </div>
      <div class="card">
          <p class="title">Contact us</p>
          <div class="card-hidden">
              <p class="title-in">
             
             </p>
              
          </div>
</div>

      </div>
      </div>
      
      <div class="card-border"></div>
 

<div class="Login-box"> 
          <div className="input-wrapper">
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <button type="submit">Login</button>
          </div>
        </form>
    
      </div>
    </div>
  )
}

export default LoginPage
