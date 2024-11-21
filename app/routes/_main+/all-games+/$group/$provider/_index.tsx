import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import { getGameRequest } from '@/apis/all-game'
import { generalKeys } from '@/factories/general'
import { GameSkeleton } from '@/features/all-game'
import { GameCard } from '@/features/home'
import { useGameQuery } from '@/queries/general'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const gameGroupCode = url.pathname.split('/')[2]
  const providerCode = url.pathname.split('/')[3]
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: generalKeys.game({
      limit: 18,
      status: 1,
      sort: 'name:asc',
      ...(gameGroupCode !== 'all-group' && { game_group_code: gameGroupCode }),
      ...(providerCode !== 'all-provider' && { provider_code: providerCode })
    }),
    queryFn: ({ queryKey }) =>
      getGameRequest({
        limit: queryKey[1]?.limit,
        status: queryKey[1]?.status,
        sort: queryKey[1]?.sort,
        page: 1,
        game_group_code: queryKey[1]?.game_group_code,
        provider_code: queryKey[1]?.provider_code
      }),
    initialPageParam: 0
  })

  return {
    dehydratedState: dehydrate(queryClient),
    gameGroupCode,
    providerCode
  }
}

const AllGamesPage = () => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1
  })

  const { gameGroupCode, providerCode } = useLoaderData<typeof loader>()
  const {
    data: gameData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGameQuery({
    status: 1,
    limit: 18,
    sort: 'name:asc',
    ...(gameGroupCode !== 'all-group' && { game_group_code: gameGroupCode }),
    ...(providerCode !== 'all-provider' && { provider_code: providerCode })
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, hasNextPage])

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {gameData?.pages?.map((page) =>
          page?.data?.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              className="self-start"
            />
          ))
        )}
      </div>
      {hasNextPage && isFetchingNextPage && <GameSkeleton />}
      <div ref={ref} />
    </>
  )
}

export default AllGamesPage
