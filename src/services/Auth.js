import axiosClient from './api'

const API_URL = 'http://localhost:3000/api/user' 

export const RegisterUser = async (userData) => {
  const response = await axiosClient.post(`${API_URL}/register`, userData)
  return response.data 
}

export const SignInUser = async (data) => {
  try {
    const res = await axiosClient.post(`${API_URL}/login`, data)
   
    localStorage.setItem('token', res.data.token)
    return res.data.user 
  } catch (error) {
    throw error 
  }
}

export const CheckSession = async () => {
  try {
    const res = await axiosClient.get(`${API_URL}/session`) 
    return res.data
  } catch (error) {
    throw error 
  }
}
