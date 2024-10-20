import Axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api'; // Adjusted to include /api

const axiosClient = Axios.create({ baseURL: BASE_URL });

// Intercepts every request axios makes
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to check user session
export const CheckSession = async () => {
  try {
    const response = await axiosClient.get('/user/session'); // Ensure the endpoint is correct
    return response.data; // Return user data
  } catch (error) {
    console.error('Error checking session:', error);
    return null; // Return null if there's an error
  }
};

export default axiosClient;
