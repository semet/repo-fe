import { useSuspenseQuery } from '@tanstack/react-query'

import { getPromotion } from '@/apis/home'
import { homeKeys } from '@/factories/home'

type Params = {
  language: string
  currency: string
  bonus?: boolean
  showCental?: 'true' | 'false'
  limit?: number
  page?: number
}

export const useGetPromotion = (params: Params) => {
  return useSuspenseQuery({
    queryKey: homeKeys.promotions(params),
    queryFn: () => getPromotion(params),
    staleTime: Number.POSITIVE_INFINITY
  })
}
