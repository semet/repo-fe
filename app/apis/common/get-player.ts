import { decodeJwt } from 'jose'

import HttpInstance from '@/libs/http-instance'
import { playerSchema } from '@/schemas/general'
import { TParamsWithToken } from '@/types'
import { handleError } from '@/utils'

type Params = TParamsWithToken

export const getPlayerRequest = async (params: Params) => {
  const { accessToken } = params
  const decodedToken = accessToken ? decodeJwt(accessToken) : undefined
  const playerId = decodedToken ? decodedToken.aud : undefined

  try {
    const { data } = await HttpInstance(accessToken).get(`/players/${playerId}`)
    return playerSchema.parse(data)
  } catch (err) {
    handleError(err)
  }
}
