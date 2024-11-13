import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters'
  }),
  captcha_solution: z.string().min(6, {
    message: 'Captcha must be at least 6 characters'
  }),
  remember: z.coerce.boolean(),
  captcha_id: z.string()
})

export const loginResponseSchema = z.object({
  data: z.object({
    hash: z.string(),
    refresh_token: z.string().or(z.undefined()),
    setup_required: z.boolean().or(z.undefined()),
    token: z.string(),
    token2: z.string()
  })
})

export type TLoginForm = z.infer<typeof loginSchema>

export type TLoginRequest = TLoginForm & {
  captcha_id: string
  hash: string
}
