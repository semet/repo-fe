import HttpServer from '@/libs/http.server'
import { languageSettingsSchema } from '@/schemas/general'

export const getLanguageSettingsRequest = async (params: { lang?: string }) => {
  const { lang } = params

  const defaultLang = lang || 'en'
  try {
    const { data } = await HttpServer().get(
      `languages/${defaultLang}/setting`,
      {
        cache: 'force-cache'
      }
    )
    return languageSettingsSchema.parse(data)
  } catch {
    throw new Error('Failed to fetch language settings')
  }
}
