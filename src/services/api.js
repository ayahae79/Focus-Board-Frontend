import Axios from 'axios'

export const BASE_URL = 'http://localhost:3000'

const axiosClient = Axios.create({ baseURL: BASE_URL })

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const CheckSession = async () => {
  try {
    const response = await axiosClient.get('/user/session')
    return response.data
  } catch (error) {
    console.error('Error checking session:', error)
    return null
  }
}

export default axiosClient
