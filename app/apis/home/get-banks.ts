import HttpInstance from '@/libs/http-instance'
import { banksSchema } from '@/schemas/home'

export const getBanks = async () => {
  try {
    const { data } = await HttpInstance().get('/banks', {
      cache: 'force-cache'
    })
    return banksSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch payment methods')
  }
}
