/* eslint-disable prettier/prettier */
import axios from 'axios'

const apiHost = 'https://task-devel.cleevio-vercel.vercel.app/api'
const AXIOSAPI = axios.create({
  baseURL: apiHost,
})

// Add a request interceptor here global function added

AXIOSAPI.interceptors.request.use((config) => {
  // localStorage.setItem('token', ('7QNTm7NOItOhLzsNvayo'))
  const token = JSON.parse(localStorage.getItem('token'))
  console.log('token',token)
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});
    

export { AXIOSAPI as default };

