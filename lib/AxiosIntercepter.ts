// File: src/utils/axiosInterceptor.ts
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'https://dztabib.onrender.com', // Replace with your API base URL
});

export const useAxiosInterceptor = () => {
  const { token} = useAuth();

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );




  // Response Interceptor
  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //   //   if we are not authorized we get a new acesssToken  Token 
  //     if (
  //       error.response &&
  //       error.response.status === 401 &&
  //       !originalRequest._retry
  //     ) {
  //       // originalRequest._retry = true;
  //       // try {
  //       //   const refreshResponse = await axios.post(
  //       //     '/auth/token/refresh/',
  //       //     {},
  //       //     { withCredentials: true }
  //       //   );

  //       //   const { access } = refreshResponse.data;
  //       //   setToken(access); // Update the token in your context

  //       //   // Retry the original request with the new token
  //       //   originalRequest.headers.Authorization = `JWT ${access}`;
  //       //   return axiosInstance(originalRequest);
  //       // } catch (refreshError) {
  //       //   console.error('Failed to refresh token', refreshError);
  //       //   // Handle logout or redirection
  //       //   setuserdata(null);
  //       //   setToken(null);
  //       //   // window.location.href = '/login'; // Redirect to login page
  //       //   return Promise.reject(refreshError);
  //       // }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  return axiosInstance;
};
