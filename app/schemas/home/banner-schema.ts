import { z } from 'zod'

export const bannerSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      type: z.number(),
      title: z.string(),
      picture_url: z.string(),
      click_url: z.string(),
      mobile_picture_url: z.string(),
      content: z.string(),
      is_active: z.boolean()
    })
  )
})

export type TBanner = z.infer<typeof bannerSchema>
