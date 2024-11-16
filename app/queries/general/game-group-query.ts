import { useQuery } from '@tanstack/react-query'

import { getGameGroupRequest } from '@/apis/common'
import { useUser } from '@/contexts'
import { generalKeys } from '@/factories/general'

export const useGameGroupQuery = () => {
  const { player } = useUser()
  const currency = player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useQuery({
    queryKey: generalKeys.gameGroup(),
    queryFn: () =>
      getGameGroupRequest({
        currency
      }),
    staleTime: Infinity
  })
}
