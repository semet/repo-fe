import { z } from 'zod'

export const gameGroupSchema = z.object({
  data: z.array(
    z.object({
      code: z.string(),
      id: z.string(),
      image_url: z.string(),
      name: z.string()
    })
  )
})

export type TGameGroupResponse = z.infer<typeof gameGroupSchema>
export type TGamGroup = TGameGroupResponse['data'][0]
