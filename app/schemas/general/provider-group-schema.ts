import { z } from 'zod'

export const providerGroupSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      provider: z.object({
        id: z.number(),
        name: z.string(),
        code: z.string()
      }),
      game_group: z.object({
        id: z.string(),
        name: z.string(),
        code: z.string()
      }),
      status: z.number(),
      sequence: z.number(),
      image_desktop: z.string(),
      image_mobile: z.string()
    })
  )
})

export type TProviderGroupResponse = z.infer<typeof providerGroupSchema>
export type TProviderGroup = TProviderGroupResponse['data'][0]
