import { useSuspenseQuery } from '@tanstack/react-query'

import { getGameGroupRequest } from '@/apis/common'
import { useUser } from '@/contexts'
import { generalKeys } from '@/factories/general'

export const useGameGroup = () => {
  const { player } = useUser()
  const currency = player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useSuspenseQuery({
    queryKey: generalKeys.gameGroup(),
    queryFn: () =>
      getGameGroupRequest({
        currency
      })
  })
}
