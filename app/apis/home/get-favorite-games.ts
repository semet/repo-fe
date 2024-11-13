import HttpInstance from '@/libs/http-instance'
import { favoriteGameSchema } from '@/schemas/home'
import { TParamsWithToken } from '@/types'
import { wait } from '@/utils'

type Params = TParamsWithToken

export const getFavoriteGames = async (params: Params) => {
  const { accessToken } = params

  return wait(4000).then(async () => {
    try {
      const { data } = await HttpInstance(accessToken).get('/game-favorites', {
        params: {
          game_status: 1
        }
      })
      return favoriteGameSchema.parse(data)
    } catch (err) {
      throw new Error('Failed to fetch favorite games')
    }
  })
}
