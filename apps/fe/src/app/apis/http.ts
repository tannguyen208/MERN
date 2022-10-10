import axios from 'axios'
import {environment} from '../../environments/environment'
import * as Qs from 'query-string'

const http = axios.create({
  baseURL: environment.apiURL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => Qs.stringify(params),
})

// declare a request interceptor
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') as string

  // Add token to headers request
  if (token) {
    config.headers = {...config.headers, Authorization: `Bearer ${token}`}
  }

  return config
})

// declare a request interceptor
http.interceptors.response.use((response) => {
  return response.data
})

export default http
