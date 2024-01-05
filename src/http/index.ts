import axios from 'axios'
import toaster from 'toastify-react'

const { REACT_APP_BACK_URL } = process.env
// Login and Registration
export const requestWithoutAuth = axios.create({
  baseURL: REACT_APP_BACK_URL,
  // timeout: 30000,
})

// Если у вас есть Токен (Acsess and Refresh)

// Acsess 1 день
// Refresh 30 дней

export const request = axios.create({
  baseURL: REACT_APP_BACK_URL,
  // timeout: 20000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
})

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token')
      axios
        .put(`${REACT_APP_BACK_URL}` + '/users/refresh', {
          refreshToken: localStorage.getItem('refresh_token'),
        })
        .then((response: any) => {
          localStorage.setItem('access_token', response?.data?.accessToken)
          localStorage.setItem('refresh_token', response?.data?.refreshToken)
        })
        .catch((error) => {
          localStorage.removeItem('refresh_token')
          window.location.reload()
          window.location.pathname = '/'
        })
    } else if (
      error.response.status >= 400 &&
      error.response.status < 500 &&
      error.response.data &&
      error.response.data.message &&
      error.response.data.message.length > 0
    ) {
      toaster.error(error.response.data.message, {
        position: 'top-right',
      })
    }
    return Promise.reject(error)
  },
)

request.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      // common: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      // }
    }
    return config
  },
  (error) => Promise.reject(error),
)
