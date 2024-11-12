import HttpServer from '@/libs/http.server'
import { webSettingsSchema } from '@/schemas/general'

export const getWebSettingsRequest = async () => {
  try {
    const { data } = await HttpServer().get('/web/settings', {
      cache: 'force-cache'
    })
    return webSettingsSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch web settings')
  }
}
