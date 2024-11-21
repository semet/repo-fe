import { z } from 'zod'

export const responseMetaSchema = z.object({
  links: z.object({ first: z.string(), last: z.string() }),
  meta: z.object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    total: z.number(),
    tz: z.string()
  })
})

export type TResponseMeta = z.infer<typeof responseMetaSchema>
