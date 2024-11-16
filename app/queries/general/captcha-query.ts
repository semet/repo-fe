import { useQuery } from '@tanstack/react-query'

import { getCaptchaRequest } from '@/apis/common'
import { generalKeys } from '@/factories/general'

export const useCaptchaQuery = (params: { action?: string }) => {
  const { action = 'login' } = params
  return useQuery({
    queryKey: generalKeys.captcha,
    queryFn: async () => getCaptchaRequest({ action })
  })
}
