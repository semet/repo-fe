import HttpInstance from '@/libs/http-instance'
import { providersSchema } from '@/schemas/home'
import { handleError, wait } from '@/utils'

export const getProviders = async () => {
  return wait(4_000).then(async () => {
    try {
      const { data } = await HttpInstance().get('/providers/active', {
        cache: 'force-cache'
      })
      return providersSchema.parse(data)
    } catch (error) {
      handleError(error)
    }
  })
}
