import { useQuery } from '@tanstack/react-query'

import { getProviderGroupRequest } from '@/apis/common'
import { useUser } from '@/contexts'
import { generalKeys } from '@/factories/general'

type Params = {
  provider_name?: string
}

export const useProviderGroupQuery = (params?: Params) => {
  const { player } = useUser()
  const currency = player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useQuery({
    queryKey: generalKeys.providerGroup(),
    queryFn: () =>
      getProviderGroupRequest({
        currency,
        provider_name: params?.provider_name
      }),
    staleTime: Infinity
  })
}
