import HttpInstance from '@/libs/http-instance'
import { lastPlayedSchema } from '@/schemas/home'
import { TParamsWithToken } from '@/types'

export const getLastPlayedGames = async (params: TParamsWithToken) => {
  try {
    const { data } = await HttpInstance(params?.accessToken).get(
      '/games/played'
    )
    return lastPlayedSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch last played games')
  }
}
