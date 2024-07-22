import axios from 'axios'

const api = axios.create({
  baseURL: 'https://melacong-api-bij5xtwena-et.a.run.app'
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default api