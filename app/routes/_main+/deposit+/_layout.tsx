import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Await, Outlet, useLoaderData, useRevalidator } from '@remix-run/react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { startTransition, Suspense, useEffect } from 'react'
import { useEventSource } from 'remix-utils/sse/react'

import {
  getBankByCurrencyRequest,
  getCompanyBankAccounts
} from '@/apis/deposit'
import { PageContainer } from '@/components/ui'
import { DepositProvider } from '@/contexts'
import { DepositSidebar } from '@/features/deposit'
import { emitter } from '@/libs/emitter.server'
import { handleToken } from '@/libs/token'
import { TSseData } from '@/schemas/deposit'
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

  function createEventSource() {
    const eventSource = new EventSourcePolyfill('https://be.i88.dev/sse/pl', {
      headers: {
        Authorization: `Bearer ${token2}`
      },
      //one hour timeout
      heartbeatTimeout: 3600000
    })
    eventSource.onopen = () => {
      // eslint-disable-next-line no-console
      console.log('SSE Connected 🚀🚀')
    }
    eventSource.onmessage = (event) => {
      emitter.emit('deposit', event.data)
    }

    eventSource.onerror = ({ type, target }) => {
      // eslint-disable-next-line no-console
      eventSource.close()
      // eslint-disable-next-line no-console
      console.error('SSE error 💥💥', type)
      // eslint-disable-next-line no-console
      console.error('SSE error 💥💥', target)
      // Retry connection after a delay
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('Reconnecting...')
        createEventSource() // Reinitialize EventSource
      }, 5000)
    }

    return eventSource
  }

  createEventSource()
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

  const { revalidate } = useRevalidator()
  const data = useEventSource('/stream/deposit', {
    event: 'deposit-event',
    enabled: true
  })
  const sseData =
    data !== null && typeof data === 'string'
      ? (JSON.parse(data) as TSseData)
      : null
  useEffect(() => {
    startTransition(() => revalidate())
    // eslint-disable-next-line react-hooks/exhaustive-deps -- "we know better" — Moishi
  }, [data])

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
                    <Outlet />
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
