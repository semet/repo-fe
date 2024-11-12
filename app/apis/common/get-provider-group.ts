import HttpServer from '@/libs/http.server'
import { providerGroupSchema } from '@/schemas/general'

type Params = {
  provider_name?: string
  code: string
  currency?: string
}

export const getProviderGroupRequest = async (params: Params) => {
  const { code, provider_name } = params
  try {
    const { data } = await HttpServer().get('/providers/group/active', {
      params: {
        code,
        status: 1,
        provider_name
      },
      cache: 'force-cache'
    })
    return providerGroupSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch provider group')
  }
}
