import {
  data,
  HeadersFunction,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import {
  getBankByCurrencyRequest,
  getCompanyBankAccounts
} from '@/apis/deposit'
import { PageContainer } from '@/components/ui'
import { DepositProvider, useUser } from '@/contexts'
import { DepositContent, DepositSidebar } from '@/features/deposit'
import { handleToken } from '@/libs/token'
import { catchLoaderError } from '@/utils'

//NOTE:: we can cache this _layout page to make subsequent navigation between deposit pages faster
export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate'
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isTokenExpires, accessToken, currency } = await handleToken(request)
  const isAuthenticated = accessToken && !isTokenExpires
  if (!isAuthenticated) {
    throw redirect('/')
  }

  const loaderData = Promise.all([
    getBankByCurrencyRequest({
      accessToken,
      currencyId: currency?.id
    }),
    getCompanyBankAccounts({
      accessToken
    })
  ])
  try {
    return data({
      loaderData
    })
  } catch (error) {
    return catchLoaderError(error)
  }
}

const DepositLayout = () => {
  const { loaderData } = useLoaderData<typeof loader>()
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
