import { ActionFunctionArgs, data } from '@remix-run/node'
import { XiorError } from 'xior'

import { userCredentialKeys } from '@/configs/cookies'
import HttpServer from '@/libs/http-instance'
import { handleToken } from '@/libs/token'
const { token, token2, refreshToken } = userCredentialKeys

export const action = async ({ request }: ActionFunctionArgs) => {
  const { accessToken } = await handleToken(request)
  try {
    await HttpServer(accessToken).post('/logout')
    const responseHeaders = new Headers()
    responseHeaders.append(
      'Set-Cookie',
      `${token}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.append(
      'Set-Cookie',
      `${token2}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.append(
      'Set-Cookie',
      `${refreshToken}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.append(
      'Set-Cookie',
      `currency=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )

    return data(
      { success: true },
      { headers: responseHeaders, status: 200, statusText: 'OK' }
    )
  } catch (error: unknown) {
    if (error instanceof XiorError) {
      const { response } = error

      if (response?.data?.error?.code) {
        const errorCode = response.data.error.code

        return Response.json(
          {
            errorCode: errorCode,
            message: 'Something went wrong',
            success: false
          },
          { status: response.status }
        )
      }
    }
    return data(
      {
        message: 'Something went wrong',
        success: false
      },
      { status: 500 }
    )
  }
}
