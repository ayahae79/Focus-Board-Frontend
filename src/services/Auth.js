import axiosClient from './api'

const API_URL = 'http://localhost:3000/api/user' // Ensure this is correct

export const RegisterUser = async (userData) => {
  const response = await axiosClient.post(`${API_URL}/register`, userData)
  return response.data // Return the user data from the response
}

export const SignInUser = async (data) => {
  try {
    const res = await axiosClient.post(`${API_URL}/login`, data)
    // Set the current signed-in user's token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data.user // Return user data
  } catch (error) {
    throw error // Throw the error to be handled in the calling function
  }
}

export const CheckSession = async () => {
  try {
    const res = await axiosClient.get(`${API_URL}/session`) // Ensure this endpoint exists
    return res.data
  } catch (error) {
    throw error // Throw the error for further handling
  }
}
