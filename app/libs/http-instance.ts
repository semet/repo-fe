import { isServer } from '@tanstack/react-query'
import xior, { merge, XiorInstance } from 'xior'

let instance: XiorInstance

const HttpInstance = (token?: string) => {
  if (!instance) {
    const baseURL = isServer ? process.env.API_URL : window.ENV.API_URL
    const apiKey = isServer ? process.env.API_KEY : window.ENV.API_KEY

    instance = xior.create({
      baseURL
    })

    // Request interceptor
    instance.interceptors.request.use((config) => {
      // eslint-disable-next-line no-console
      console.log(`🚀🚀🚀Request >> ${config.url}`)
      return merge(config, {
        headers: {
          ...(apiKey && { 'x-data-reference': apiKey }),
          'x-device': config.headers['x-device'] ?? 'desktop',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      })
    })

    // Response interceptor
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
  }

  return instance
}

export default HttpInstance
