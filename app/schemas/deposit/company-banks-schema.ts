import { z } from 'zod'

export const companyBanksSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      bank_group_id: z.string(),
      bank_id: z.string(),
      account_no: z.string(),
      account_name: z.string(),
      status: z.number(),
      cuts: z.number(),
      bank: z.object({
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
        partner_code: z.null(),
        currency: z.object({
          id: z.string(),
          name: z.string(),
          code: z.string(),
          image_name: z.string().or(z.null()),
          status: z.number(),
          is_default: z.null(),
          price_per_coin: z.number(),
          region: z.null(),
          time_offset: z.null()
        })
      }),
      bank_group: z.object({
        id: z.string(),
        name: z.string(),
        status: z.number(),
        priority: z.number(),
        player_total_deposit: z.null(),
        currency_id: z.string(),
        is_default: z.boolean()
      })
    })
  )
})

export type TCompanyBanksResponse = z.infer<typeof companyBanksSchema>
export type TCompanyBank = TCompanyBanksResponse['data'][0]
