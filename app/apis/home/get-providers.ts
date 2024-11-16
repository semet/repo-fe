import HttpInstance from '@/libs/http-instance'
import { providersSchema } from '@/schemas/home'
import { handleError } from '@/utils'

export const getProviders = async () => {
  try {
    const { data } = await HttpInstance().get('/providers/active')
    return providersSchema.parse(data)
  } catch (error) {
    handleError(error)
  }
}
