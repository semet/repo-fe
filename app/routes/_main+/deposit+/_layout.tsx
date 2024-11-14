import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Await, Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import {
  getBankByCurrencyRequest,
  getCompanyBankAccounts
} from '@/apis/deposit'
import { PageContainer } from '@/components/ui'
import { DepositProvider } from '@/contexts'
import { DepositSidebar } from '@/features/deposit'
import { handleToken } from '@/libs/token'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isTokenExpires, accessToken, currency } = await handleToken(request)
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

  return {
    data
  }
}

const DepositLayout = () => {
  const { data } = useLoaderData<typeof loader>()
  return (
    <PageContainer title="Deposit">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data}>
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
                  <Outlet />
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
