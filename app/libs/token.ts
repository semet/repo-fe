import { decodeJwt } from 'jose'

import {
  currencyTokenCookie,
  promotionTokenCookie,
  refreshTokenCookie,
  token2Cookie,
  tokenCookie
} from './cookie.server'

export const generateTokenCookie = (params: {
  token: string
  remember: boolean
}) => {
  const { remember, token } = params

  const decodedToken = decodeJwt(token)
  const decodedTokenExp = decodedToken.exp
  const expirationDate =
    remember && decodedTokenExp ? new Date(decodedTokenExp * 1000) : undefined

  return tokenCookie.serialize(token, {
    expires: expirationDate
  })
}

export const generateToken2Cookie = (params: {
  token: string
  remember: boolean
}) => {
  const { remember, token } = params

  const oneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  const expirationDate = remember ? oneYear : undefined

  return token2Cookie.serialize(token, {
    expires: expirationDate
  })
}

export const generateRefreshTokenCookie = (params: {
  token: string
  remember: boolean
}) => {
  const { remember, token } = params

  const decodedToken = decodeJwt(token)
  const decodedTokenExp = decodedToken.exp

  const expirationDate =
    remember && decodedTokenExp ? new Date(decodedTokenExp * 1000) : undefined

  return refreshTokenCookie.serialize(token, {
    expires: expirationDate
  })
}

export const generateCurrencyCookie = (params: {
  currency: {
    code: string
    id: string
  }
}) => {
  const { currency } = params

  return currencyTokenCookie.serialize(currency, {
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  })
}

export const checkIfTokenExpires = (token?: string): boolean => {
  if (!token) return true
  const decodedToken = decodeJwt(token)
  const decodedTokenExp = decodedToken.exp

  if (!decodedTokenExp) return true

  const now = new Date().getTime() / 1000

  return now > decodedTokenExp
}

export const handleToken = async (request: Request) => {
  const headers = request.headers
  const accessToken = await tokenCookie.parse(headers.get('Cookie'))
  const token2 = await token2Cookie.parse(headers.get('Cookie'))
  const refreshToken = await refreshTokenCookie.parse(headers.get('Cookie'))
  const currency = await currencyTokenCookie.parse(headers.get('Cookie'))
  const showPromotion = await promotionTokenCookie.parse(headers.get('Cookie'))
  const isTokenExpires = checkIfTokenExpires(accessToken)
  return {
    accessToken,
    currency,
    showPromotion,
    isTokenExpires,
    refreshToken,
    token2
  }
}
