import { z } from 'zod'

export const captchaResponseSchema = z.object({
  data: z.object({
    captcha_id: z.string(),
    remaining_refresh: z.number(),
    next_refresh_at: z.string().or(z.null()),
    data: z.string()
  })
})

export type TCaptchaResponse = z.infer<typeof captchaResponseSchema>
