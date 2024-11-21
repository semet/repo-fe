import { TGameParams } from '@/features/all-game'
import HttpInstance from '@/libs/http-instance'
import { gameSchema } from '@/schemas/home'

export const getGameRequest = async (params: TGameParams) => {
  try {
    const { data } = await HttpInstance().get('/games', {
      params,
      cache: 'force-cache'
    })
    return gameSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch providers')
  }
}
