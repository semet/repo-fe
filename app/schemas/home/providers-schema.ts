import { z } from 'zod'

export const providersSchema = z.object({
  data: z.array(
    z.object({
      merchant_id: z.number(),
      id: z.number(),
      name: z.string(),
      code: z.string(),
      image_name: z.string().or(z.null()),
      status: z.number(),
      sequence: z.number().or(z.null()),
      total_game: z.number()
    })
  )
})

export type TProvidersResponse = z.infer<typeof providersSchema>
export type TProvider = z.infer<typeof providersSchema>['data'][0]
