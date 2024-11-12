import HttpInstance from '@/libs/http-instance'
import { styleSchema } from '@/schemas/general'

export const getStyleRequest = async () => {
  try {
    const { data } = await HttpInstance().get('/themes/active/style_options', {
      cache: 'force-cache'
    })
    return styleSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch style options')
  }
}
