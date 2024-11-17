import { isServer } from '@tanstack/react-query'
import xior, { merge } from 'xior'

const HttpInstance = (token?: string) => {
  const baseURL = isServer ? process.env.API_URL : window.ENV.API_URL
  const apiKey = isServer ? process.env.API_KEY : window.ENV.API_KEY
  const instance = xior.create({
    baseURL
  })
  instance.interceptors.request.use((config) => {
    if (apiKey) {
      config.headers['x-data-reference'] = apiKey
    }

    return merge(config, {
      headers: {
        ...(apiKey && { 'x-data-reference': apiKey }),
        'x-device': config.headers['x-device'] ?? 'desktop',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (typeof window !== 'undefined' && error?.response?.status === 401) {
        window.location.href = '/'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default HttpInstance
