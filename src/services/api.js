import Axios from 'axios'

export const BASE_URL = 'http://localhost:3000'

const axiosClient = Axios.create({ baseURL: BASE_URL })

// Intercepts every request axios makes
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Function to check user session
export const CheckSession = async () => {
  try {
    const response = await axiosClient.get('/session') // Adjust the endpoint as necessary
    return response.data // Return user data
  } catch (error) {
    console.error('Error checking session:', error)
    return null // Return null if there's an error
  }
}

export default axiosClient
