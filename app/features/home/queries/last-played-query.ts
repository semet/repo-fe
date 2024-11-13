import { useSuspenseQuery } from '@tanstack/react-query'

import { getLastPlayedGames } from '@/apis/home'
import { homeKeys } from '@/factories/home'

export const useGetLastPlayed = () => {
  return useSuspenseQuery({
    queryKey: homeKeys.lastPlayedGames,
    queryFn: getLastPlayedGames
  })
}
