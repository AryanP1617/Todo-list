import axios from 'axios'

// Create axios instance
const axiosInstance = axios.create({
    baseURL: 'https://todo-list-7226.onrender.com/api',
    withCredentials: true
})

// Set up response interceptor for token refresh
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 500 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Call refresh token endpoint
                await axiosInstance.post('/users/refresh-token')

                // Retry the original request with new token
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                // Redirect to login if refresh fails
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance