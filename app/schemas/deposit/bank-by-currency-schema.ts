import { z } from 'zod'

export const bankByCurrencySchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      code: z.string(),
      category: z.string(),
      image_name: z.string(),
      status: z.number(),
      player_min_deposit: z.number(),
      player_max_deposit: z.number(),
      player_min_withdraw: z.number(),
      player_max_withdraw: z.number(),
      account_min_digit: z.number(),
      account_max_digit: z.number(),
      currency_id: z.string(),
      partner_code: z.string().or(z.null()),
      currency: z.object({
        id: z.string(),
        name: z.string(),
        code: z.string(),
        image_name: z.string().or(z.null()),
        status: z.number(),
        is_default: z.boolean().or(z.null()),
        price_per_coin: z.number(),
        region: z.string(),
        time_offset: z.string()
      })
    })
  )
})

export type TBankByCurrencyResponse = z.infer<typeof bankByCurrencySchema>
export type TBanksByCurrency = TBankByCurrencyResponse['data'][0]
