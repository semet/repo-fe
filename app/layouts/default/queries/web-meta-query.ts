import { useSuspenseQuery } from '@tanstack/react-query'

import { getWebMetasRequest } from '@/apis/common'
import { generalKeys } from '@/factories/general'

export const useWebMeta = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.webMeta,
    queryFn: getWebMetasRequest
  })
}
