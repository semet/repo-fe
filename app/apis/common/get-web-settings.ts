import HttpInstance from '@/libs/http-instance'
import { webSettingsSchema } from '@/schemas/general'

export const getWebSettingsRequest = async () => {
  try {
    const { data } = await HttpInstance().get('/web/settings', {
      cache: 'force-cache'
    })
    return webSettingsSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch web settings')
  }
}
