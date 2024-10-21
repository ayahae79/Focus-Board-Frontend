import axiosClient from './api'

const API_URL = 'http://localhost:3000'

export const RegisterUser = async (userData) => {
  const response = await axiosClient.post(`${API_URL}/user/register`, userData)
  return response.data
}

export const SignInUser = async (data) => {
  try {
    const res = await axiosClient.post(`${API_URL}/user/login`, data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await axiosClient.get(`${API_URL}/user/session`)
    return res.data
  } catch (error) {
    throw error
  }
}
