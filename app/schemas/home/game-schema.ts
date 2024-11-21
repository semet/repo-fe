import { z } from 'zod'

import { responseMetaSchema } from './meta-schema'

export const gameSchema = z
  .object({
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
        favorite: z.boolean(),
        created_at: z.string()
      })
    )
  })
  .merge(responseMetaSchema)

export type TGameResponse = z.infer<typeof gameSchema>
export type TGame = TGameResponse['data'][number]
