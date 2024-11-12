import { useSuspenseQuery } from '@tanstack/react-query'

import { getWebSettingsRequest } from '@/apis/common'
import { generalKeys } from '@/factories/general'

export const useWebSettings = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.webSettings,
    queryFn: getWebSettingsRequest
  })
}
