import { useSuspenseQuery } from '@tanstack/react-query'

import { getStyleRequest } from '@/apis/common'
import { generalKeys } from '@/factories/general'

export const useActiveStyle = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.activeStyle,
    queryFn: getStyleRequest
  })
}
