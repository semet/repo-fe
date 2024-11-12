import { z } from 'zod'

export const webMetasSchema = z.object({
  data: z.object({
    about_text: z.string(),
    content: z.string(),
    footer_text: z.string(),
    html_title: z.string(),
    meta_title_config: z
      .array(z.object({ path: z.string(), title: z.string() }))
      .or(z.null())
  })
})

export type TWebMetaResponse = z.infer<typeof webMetasSchema>
export type TWebMeta = TWebMetaResponse['data']
