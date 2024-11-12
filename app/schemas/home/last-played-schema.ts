import { z } from 'zod'

export const lastPlayedSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      code: z.string(),
      category_id: z.string(),
      category: z.string(),
      image_name: z.string().or(z.null()),
      status: z.number(),
      sequence: z.number().or(z.null()),
      rtp: z.number(),
      played_at: z.number(),
      game_group: z.object({
        id: z.string(),
        code: z.string(),
        name: z.string()
      }),
      provider: z.object({
        id: z.number(),
        code: z.string(),
        name: z.string(),
        image_name: z.string()
      }),
      favorite: z.boolean()
    })
  )
})

export type TLastPlayed = z.infer<typeof lastPlayedSchema>
export type TLastPlayedData = TLastPlayed['data'][0]
