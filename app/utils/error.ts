import { redirect } from '@remix-run/react'
import { XiorError } from 'xior'
import { ZodError } from 'zod'

import { userCredentialKeys } from '@/configs/cookies'
const { token, token2, refreshToken } = userCredentialKeys

export function handleError(error: unknown): never {
  if (error instanceof XiorError) {
    // const status = error.response?.status || 500
    // const message =
    //   error.response?.data?.message || 'An error occurred while fetching '
    throw error
  } else if (error instanceof ZodError) {
    throw new Error(
      JSON.stringify({
        status: 400,
        message: 'Failed to parse data. Please check the schema'
      })
    )
  } else {
    throw new Error(
      JSON.stringify({
        status: 500,
        message: 'Failed to fetch data. Please try again'
      })
    )
  }
}

export const catchLoaderError = (error: unknown) => {
  if (error instanceof XiorError && error.response?.status === 401) {
    const responseHeaders = redirect('/')
    responseHeaders.headers.append(
      'Set-Cookie',
      `${token}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.headers.append(
      'Set-Cookie',
      `${token2}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.headers.append(
      'Set-Cookie',
      `${refreshToken}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )

    throw responseHeaders
  }
  throw error
}
