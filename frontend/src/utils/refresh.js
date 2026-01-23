import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://todo-list-7226.onrender.com/api',
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        // Hard stop: never intercept refresh endpoint itself
        if (originalRequest.url.includes('/users/refresh-token')) {
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                await axiosInstance.post('/users/refresh-token')
                return axiosInstance(originalRequest)
            } catch (err) {
                window.location.href = '/login'
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
    