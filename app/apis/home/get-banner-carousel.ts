import HttpInstance from '@/libs/http-instance'
import { bannerSchema } from '@/schemas/home'
import { handleError } from '@/utils'

type Params = {
  language: string
  showCentral?: 'true' | 'false'
  currency?: string
}

export const getBannerCarousel = async (params: Params) => {
  const { language, showCentral, currency } = params
  try {
    const { data } = await HttpInstance().get('/banners/activ', {
      params: {
        language,
        type: 1,
        central: showCentral || 'false',
        sort: 'sequence:asc',
        currency
      },
      cache: 'force-cache'
    })
    return bannerSchema.parse(data)
  } catch (error) {
    handleError(error)
  }
}
