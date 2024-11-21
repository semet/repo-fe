import { data, LoaderFunctionArgs } from '@remix-run/node'
import { Await, Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import { getLastPlayedGames } from '@/apis/home'
import { PageContainer } from '@/components/ui'
import { useLayout, useUser } from '@/contexts'
import { GameCategories, LastPlayed } from '@/features/all-game'
import { handleToken } from '@/libs/token'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { accessToken } = await handleToken(request)
  const lastPlayed = accessToken
    ? getLastPlayedGames({ accessToken })
    : undefined

  return data({
    lastPlayed
  })
}

export const shouldRevalidate = () => false

const AllGameLayout = () => {
  const { lastPlayed } = useLoaderData<typeof loader>()
  const { accessToken } = useUser()
  const { gameGroups } = useLayout()
  return (
    <PageContainer>
      {accessToken && (
        <Suspense fallback={<>Loading ....</>}>
          <Await resolve={lastPlayed}>
            {(lastPlayed) => <LastPlayed games={lastPlayed?.data} />}
          </Await>
        </Suspense>
      )}

      <Suspense fallback={<>Loading ....</>}>
        <Await resolve={gameGroups}>
          {({ data: gameGroups }) => <GameCategories gameGroups={gameGroups} />}
        </Await>
      </Suspense>
      <Outlet />
    </PageContainer>
  )
}

export default AllGameLayout
