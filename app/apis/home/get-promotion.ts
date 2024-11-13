import HttpInstance from '@/libs/http-instance'
import { promotionSchema } from '@/schemas/home'

type Params = {
  language: string
  currency: string
  bonus?: boolean
  showCental?: 'true' | 'false'
  limit?: number
  page?: number
}

export const getPromotion = async (params: Params) => {
  const {
    currency,
    language,
    bonus = false,
    showCental = 'false',
    limit = -1,
    page = 1
  } = params

  try {
    const { data } = await HttpInstance().get('/promotions/active', {
      params: {
        currency,
        language,
        bonus,
        central: showCental === 'true',
        sort: 'sequence:asc',
        limit,
        page
      }
    })
    return promotionSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch promotion')
  }
}
