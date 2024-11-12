import { z } from 'zod'

export const promotionSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      image_url: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      status: z.number(),
      currencies: z.array(z.object({ id: z.string(), code: z.string() })),
      bonus: z.object({ id: z.string(), name: z.string() }).or(z.null()),
      source: z.string()
    })
  )
})

export type TPromotionResponse = z.infer<typeof promotionSchema>
export type TPromotion = z.infer<typeof promotionSchema>['data'][0]
