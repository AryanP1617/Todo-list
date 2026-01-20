import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("The token has expired !!!")
        await axios.post('/api/users/refresh-token', {}, { 
          withCredentials: true 
        });

        return api(originalRequest);
      } catch (refreshError) {

        // window.location.href = '/login';
        console.log("The refreshToken has somehow expired this is the error",refreshError)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;