import HttpInstance from '@/libs/http-instance'
import { gameGroupSchema } from '@/schemas/general'

type Params = {
  currency: string
}

export const getGameGroupRequest = async (params: Params) => {
  const { currency } = params
  try {
    const { data } = await HttpInstance().get('/game-groups', {
      params: {
        page: 1,
        limit: 10,
        currency
      },
      cache: 'force-cache'
    })
    return gameGroupSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch game group')
  }
}
