import HttpServer from '@/libs/http.server'
import { webMetasSchema } from '@/schemas/general'

export const getWebMetasRequest = async () => {
  try {
    const { data } = await HttpServer().get('/moneysite-metas', {
      cache: 'force-cache'
    })
    return webMetasSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch money site metas')
  }
}
