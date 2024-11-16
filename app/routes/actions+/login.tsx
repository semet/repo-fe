import { zodResolver } from '@hookform/resolvers/zod'
import { ActionFunctionArgs, data, LoaderFunctionArgs } from '@remix-run/node'
import { getValidatedFormData } from 'remix-hook-form'
import { XiorError } from 'xior'

import { getPlayerRequest, loginRequest } from '@/apis/common'
import {
  generateCurrencyCookie,
  generateRefreshTokenCookie,
  generateToken2Cookie,
  generateTokenCookie
} from '@/libs/token'
import { loginSchema, TLoginForm } from '@/schemas/auth'
import { hashText } from '@/utils'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const {
      errors,
      data: formData,
      receivedValues: defaultValues
    } = await getValidatedFormData<TLoginForm>(
      request,
      zodResolver(loginSchema),
      true
    )

    if (errors) {
      return Response.json(
        { success: false, errors, defaultValues },
        { status: 400 }
      )
    } else {
      const hash = hashText({
        ...formData
      })
      const payload = {
        ...formData,
        hash
      }
      const { data: responseData } = await loginRequest(payload)
      const { remember } = formData
      const {
        token,
        token2,
        refresh_token: refreshToken,
        hash: hashResponse
      } = responseData
      const preHash = {
        refresh_token: refreshToken || undefined,
        token,
        token2
      }
      if (!preHash.refresh_token) delete preHash.refresh_token

      const confirmHash = hashText(preHash)
      if (confirmHash === hashResponse) {
        const { data: playerData } = await getPlayerRequest({
          accessToken: token
        })

        const tokenCookie = generateTokenCookie({
          remember,
          token
        })
        const token2Cookie = generateToken2Cookie({
          remember,
          token: token2
        })

        const refreshTokenCookie = generateRefreshTokenCookie({
          remember,
          token
        })

        const currencyTokenCookie = generateCurrencyCookie({
          currency: {
            code: playerData.account.bank.currency.code.toLowerCase(),
            id: playerData.account.bank.currency_id
          }
        })

        const headers = new Headers()
        headers.append('Set-Cookie', await tokenCookie)
        headers.append('Set-Cookie', await token2Cookie)
        headers.append('Set-Cookie', await refreshTokenCookie)
        headers.append('Set-Cookie', await currencyTokenCookie)

        return data(
          {
            success: true,
            message: 'Login success',
            player: playerData
          },
          {
            headers,
            status: 200,
            statusText: 'OK'
          }
        )
      }
    }
  } catch (error) {
    if (error instanceof XiorError && error?.response?.status === 401) {
      return data(
        {
          success: false,
          message: 'Invalid credentials'
        },
        {
          status: error?.response?.status
        }
      )
    } else {
      return data(
        {
          success: false,
          message: 'Internal server error'
        },
        {
          status: 500
        }
      )
    }
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method !== 'POST') {
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/'
      }
    })
  } else {
    return null
  }
}
