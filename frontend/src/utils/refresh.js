import axios from 'axios'

// Set up axios with credentials
axios.defaults.withCredentials = true

// Set up response interceptor for token refresh
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 500 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Call refresh token endpoint
                await axios.post('https://todo-list-7226.onrender.com/api/users/refresh-token')

                // Retry the original request with new token
                return axios(originalRequest)
            } catch (refreshError) {
                // Redirect to login if refresh fails
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axios
