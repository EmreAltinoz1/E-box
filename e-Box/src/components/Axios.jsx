import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
})

// Token'ı header'a ekleyen interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

