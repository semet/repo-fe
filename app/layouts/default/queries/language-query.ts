import { useSuspenseQuery } from '@tanstack/react-query'

import { getLanguageSettingsRequest } from '@/apis/common'
import { generalKeys } from '@/factories/general'

export const useActiveLanguage = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.language,
    queryFn: () => getLanguageSettingsRequest({ lang: 'en' })
  })
}
