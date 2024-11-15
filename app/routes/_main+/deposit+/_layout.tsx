/* eslint-disable no-console */
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import {
  getBankByCurrencyRequest,
  getCompanyBankAccounts
} from '@/apis/deposit'
import { PageContainer } from '@/components/ui'
import { DepositProvider, useUser } from '@/contexts'
import { DepositContent, DepositSidebar } from '@/features/deposit'
import { createEventSource } from '@/libs/event-source.server'
import { handleToken } from '@/libs/token'
import { catchLoaderError } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isTokenExpires, accessToken, currency, token2 } =
    await handleToken(request)
  const isAuthenticated = accessToken && !isTokenExpires
  if (!isAuthenticated) {
    throw redirect('/')
  }

  const data = Promise.all([
    getBankByCurrencyRequest({
      accessToken,
      currencyId: currency?.id
    }),
    getCompanyBankAccounts({
      accessToken
    })
  ])

  createEventSource({ token2 })
  try {
    return {
      data
    }
  } catch (error) {
    return catchLoaderError(error)
  }
}

const DepositLayout = () => {
  const { data: loaderData } = useLoaderData<typeof loader>()
  const { sseData } = useUser()

  const isDepositPending = sseData?.data?.deposit?.some((deposit) =>
    [1, 4].includes(deposit.status)
  )
  return (
    <PageContainer title="Deposit">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={loaderData}>
          {(data) => (
            <DepositProvider
              values={{
                banks: data[0].data,
                companyBanks: data[1].data
              }}
            >
              <main className="flex gap-11">
                <DepositSidebar />
                <div className="flex-1 bg-primary p-6">
                  {isDepositPending ? (
                    <div>
                      <h1 className="text-4xl text-white">
                        There is a pending deposit
                      </h1>
                    </div>
                  ) : (
                    <DepositContent />
                  )}
                </div>
              </main>
            </DepositProvider>
          )}
        </Await>
      </Suspense>
    </PageContainer>
  )
}

export default DepositLayout
