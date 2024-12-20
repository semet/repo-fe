import HttpInstance from '@/libs/http-instance'
import { captchaResponseSchema } from '@/schemas/auth'

export const getCaptchaRequest = async (params: { action: string }) => {
  const { action } = params
  try {
    const { data } = await HttpInstance().post('/captcha/reload', {
      action
    })
    return captchaResponseSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch captcha data')
  }
}
