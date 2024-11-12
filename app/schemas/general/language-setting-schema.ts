import { z } from 'zod'

export const languageSettingsSchema = z.object({
  data: z.object({
    merchant_id: z.number().or(z.undefined()),
    language_id: z.string(),
    html_title: z.string(),
    running_text: z.string(),
    about_text: z.string(),
    footer_text: z.string(),
    created_at: z.string().or(z.undefined()),
    created_by: z.string().or(z.undefined()),
    updated_at: z.string().or(z.undefined()),
    updated_by: z.string().or(z.undefined()),
    progresive_jackpot: z.number(),
    referral_image: z.string(),
    referral_text: z.string(),
    register_image_1: z.string(),
    register_image_2: z.string()
  })
})

export type TLanguageSettings = z.infer<typeof languageSettingsSchema>
