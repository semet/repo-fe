import HttpInstance from '@/libs/http-instance'
import { webMetasSchema } from '@/schemas/general'

export const getWebMetasRequest = async () => {
  try {
    const { data } = await HttpInstance().get('/moneysite-metas', {
      cache: 'force-cache'
    })
    return webMetasSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch money site metas')
  }
}
