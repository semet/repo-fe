import { useInfiniteQuery } from '@tanstack/react-query'

import { getGameRequest } from '@/apis/all-game'
import { generalKeys } from '@/factories/general'
import { TGameParams } from '@/features/all-game'

export const useGameQuery = (params: TGameParams) => {
  return useInfiniteQuery({
    queryKey: generalKeys.game(params),
    queryFn: ({ pageParam }) => getGameRequest({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta?.current_page
      const lastPageNumber = lastPage?.meta?.last_page
      // Assuming your TResponse has a 'hasNextPage' field to indicate more data
      return currentPage < lastPageNumber ? currentPage + 1 : null
    }
  })
}
