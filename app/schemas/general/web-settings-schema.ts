import { z } from 'zod'

const baseSchema = z.object({
  name: z.string(),
  description: z.string().or(z.null()),
  is_enable: z.boolean(),
  type: z.string(),
  value: z.string(),
  modified_by: z.string()
})

export const webSettingsSchema = z.object({
  data: z.object({
    allow_disbursement: baseSchema,
    amp_login: baseSchema,
    amp_register: baseSchema,
    apk_url: baseSchema,
    auto_withdraw: baseSchema,
    auto_withdraw_max_amount: baseSchema,
    auto_withdraw_min_amount: baseSchema,
    bonus_setting: baseSchema,
    fcm_topic: baseSchema,
    game_purchase: baseSchema,
    homepage_only: baseSchema,
    ingame_tag_meta_widget: baseSchema,
    ingame_tag_meta_widget_mobile: baseSchema,
    ingame_widget: baseSchema,
    ingame_widget_mobile: baseSchema,
    limit_withdraw_player_per_day: baseSchema,
    limit_withdraw_web_per_day: baseSchema,
    maintenance: baseSchema,
    payment_bank: baseSchema,
    payment_crypto: baseSchema,
    payment_ewallet: baseSchema,
    payment_phone_credit: baseSchema,
    payment_qris: baseSchema,
    payment_va: baseSchema,
    show_banner: baseSchema,
    show_promotion: baseSchema,
    tag_html: baseSchema,
    tag_meta_type_content: baseSchema,
    tag_meta_type_name: baseSchema,
    tag_meta_widget: baseSchema,
    upload_image_setting: baseSchema,
    web_favicon: baseSchema,
    web_footer: baseSchema,
    web_google_analytics: baseSchema,
    web_live_chat_code: baseSchema,
    web_live_chat_type: baseSchema,
    web_logo: baseSchema,
    web_running_text: baseSchema,
    wl_moneysite: baseSchema
  })
})

export type TWebSettingResponse = z.infer<typeof webSettingsSchema>
export type TWebSetting = TWebSettingResponse['data']
