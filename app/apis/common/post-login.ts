import HttpInstance from '@/libs/http-instance'
import { loginResponseSchema, TLoginRequest } from '@/schemas/auth'

export const loginRequest = async (params: TLoginRequest) => {
  try {
    const { data } = await HttpInstance().post('/player/login', params)
    return loginResponseSchema.parse(data)
  } catch (err) {
    return Promise.reject(err)
  }
}
