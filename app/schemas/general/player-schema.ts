import { z } from 'zod'

export const playerSchema = z.object({
  data: z.object({
    merchant_id: z.number(),
    id: z.string(),
    bank_group_id: z.string(),
    username: z.string(),
    full_name: z.string(),
    phone: z.string(),
    status: z.number(),
    total_deposit: z.number(),
    created_at: z.string(),
    referred_by: z.string().or(z.null()),
    last_login_at: z.string(),
    last_login_ip: z.string(),
    colour_code: z.string().or(z.null()),
    allow_rebate: z.boolean(),
    allow_referral: z.boolean(),
    main_wallet: z.object({
      id: z.string(),
      provider_id: z.number(),
      balance: z.number(),
      status: z.number()
    }),
    account: z.object({
      id: z.string(),
      merchant_id: z.number(),
      account_no: z.string(),
      account_name: z.string(),
      bank_id: z.string(),
      bank: z.object({
        id: z.string(),
        merchant_id: z.number(),
        name: z.string(),
        code: z.string(),
        category: z.string(),
        image_name: z.string(),
        currency_id: z.string(),
        currency: z.object({
          merchant_id: z.number(),
          id: z.string(),
          name: z.string(),
          code: z.string(),
          image_name: z.string().or(z.null()),
          price_per_coin: z.number(),
          status: z.number()
        })
      })
    }),
    email: z.string(),
    email_verified: z.boolean(),
    is_kyc_verified: z.boolean()
  })
})

export type TPlayerResponse = z.infer<typeof playerSchema>
export type TPlayer = TPlayerResponse['data']
