import { z } from 'zod'

export const favoriteGameSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      code: z.string(),
      category_id: z.string(),
      category: z.string(),
      image_name: z.string(),
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
      })
    })
  )
})

export type TFavoriteGames = z.infer<typeof favoriteGameSchema>
export type TFavoriteGamesData = TFavoriteGames['data'][0]
