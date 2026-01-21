import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-list-7226.onrender.com',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('https://todo-list-7226.onrender.com/api/users/refresh-token')

        return api(originalRequest);

      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
