import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

// Define the base URL for the backend API
// In production, this might come from import.meta.env.VITE_API_URL
const BASE_URL = 'http://metamorfosis-back.test'

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important for Sanctum cookie-based auth
})

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            // We might need to import the router here or handle this in the store
            console.warn('Unauthorized access. cleaning up session...')
            // window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default apiClient
