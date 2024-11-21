import HttpInstance from '@/libs/http-instance'
import { providersSchema } from '@/schemas/home'

type Params = {
  orderBySequence?: boolean
  game_group_code?: string
}

export const getProviderRequest = async (params: Params) => {
  try {
    const { data } = await HttpInstance().get('/providers/active', {
      params,
      cache: 'force-cache'
    })
    return providersSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch providers')
  }
}
