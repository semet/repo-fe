import { useQuery } from '@tanstack/react-query'

import { getProviderGroupRequest } from '@/apis/common'
import { useUser } from '@/contexts'
import { generalKeys } from '@/factories/general'

type Params = {
  provider_name?: string
  code: string
}

export const useProviderGroup = (params: Params) => {
  const { code, provider_name } = params

  const { player } = useUser()
  const currency = player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useQuery({
    queryKey: generalKeys.providerGroup(code),
    queryFn: () =>
      getProviderGroupRequest({
        code,
        currency,
        provider_name
      }),
    enabled: code !== ''
  })
}
