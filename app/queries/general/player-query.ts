import { useQuery } from '@tanstack/react-query'

import { getPlayerRequest } from '@/apis/common'
import { useUser } from '@/contexts'
import { generalKeys } from '@/factories/general'

export const usePlayerQuery = () => {
  const { accessToken } = useUser()
  return useQuery({
    queryKey: generalKeys.player,
    queryFn: () =>
      getPlayerRequest({
        accessToken: accessToken
      }),
    enabled: !!accessToken
  })
}
