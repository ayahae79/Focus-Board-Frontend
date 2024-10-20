import axiosClient from "./api"
import axios from "axios"

const API_URL = "http://localhost:3000/user" // Update to your API base URL

export const RegisterUser = async (userData) => {
  const response = await axiosClient.post(`${API_URL}/register`, userData)
  return response.data // Return the user data from the response
}

export const SignInUser = async (data) => {
  try {
    const res = await axiosClient.post(`${API_URL}/login`, data)
    // Set the current signed in users token to localStorage
    localStorage.setItem("token", res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await axiosClient.get(`${API_URL}/session`)
    return res.data
  } catch (error) {
    throw error
  }
}
