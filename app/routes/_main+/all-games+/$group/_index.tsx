import { data, LoaderFunctionArgs } from '@remix-run/node'
import { Await, Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import { getProviderRequest } from '@/apis/all-game'
import { GameProviders } from '@/features/all-game'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const groupCode = url.pathname.split('/')[2]

  const providers = getProviderRequest({
    orderBySequence: true,
    ...(groupCode !== 'all-group' && { game_group_code: groupCode })
  })

  return data({
    providers
  })
}

const ProviderByGameGroup = () => {
  const { providers } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="bg-primary p-4 text-white">
        <Suspense fallback={<>Loading ....</>}>
          <Await resolve={providers}>
            {({ data: providers }) => <GameProviders providers={providers} />}
          </Await>
        </Suspense>
      </div>
      <Outlet />
    </>
  )
}

export default ProviderByGameGroup
