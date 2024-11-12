import HttpServer from '@/libs/http.server'
import { loginResponseSchema, TLoginRequest } from '@/schemas/auth'

export const loginRequest = async (params: TLoginRequest) => {
  try {
    const { data } = await HttpServer().post('/player/login', params)
    return loginResponseSchema.parse(data)
  } catch (err) {
    return Promise.reject(err)
  }
}
