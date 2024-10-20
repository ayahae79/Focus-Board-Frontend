import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const LoginPage = ({ setUser }) => {
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
      localStorage.setItem('user', JSON.stringify(payload)) // Save user to localStorage
      navigate('/')
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
        </form>
      </div>
    </div>
  )
}

export default LoginPage
