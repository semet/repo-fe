import { z } from 'zod'

export const sseDataSchema = z.object({
  type: z.enum(['init', 'dp', 'wd']),
  data: z.object({
    main_wallet: z.object({
      balance: z.number(),
      status: z.number(),
      provider: z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        image_name: z.string()
      })
    }),
    provider_wallets: z.string().or(z.null()),
    deposit: z
      .array(
        z.object({
          id: z.string(),
          player_id: z.string(),
          player: z.object({
            id: z.string(),
            merchant_id: z.number(),
            username: z.string(),
            full_name: z.string(),
            total_deposit: z.number(),
            colour_code: z.string().or(z.null()),
            note: z.string().or(z.null())
          }),
          player_account_no: z.string(),
          player_account_name: z.string(),
          player_bank: z.object({
            id: z.string(),
            merchant_id: z.number(),
            name: z.string(),
            code: z.string(),
            category: z.string(),
            image_name: z.string()
          }),
          player_colour_code: z.string().or(z.null()),
          player_remark: z.string().or(z.null()),
          company_account_no: z.string(),
          company_account_name: z.string(),
          company_bank: z.object({
            id: z.string(),
            merchant_id: z.number(),
            name: z.string(),
            code: z.string(),
            category: z.string(),
            image_name: z.string()
          }),
          transaction_id: z.string(),
          transaction_category_id: z.number(),
          description: z.string().or(z.null()),
          agent_note: z.string().or(z.null()),
          reject_note: z.string().or(z.null()),
          player_note: z.string(),
          amount: z.number(),
          balance: z.number(),
          fee: z.number(),
          bonus: z.number(),
          status: z.number(),
          currency_id: z.string(),
          currency: z.object({
            name: z.string(),
            code: z.string(),
            image_name: z.string()
          }),
          price: z.number(),
          created_at: z.string(),
          created_by: z.string(),
          processed_at: z.string(),
          processed_by: z.string().or(z.null()),
          payment_log: z.string().or(z.null())
        })
      )
      .or(z.null()),
    withdraw: z.string().or(z.null())
  }),
  info: z.string().or(z.null()),
  dp_version: z.number(),
  wd_version: z.number()
})

export type TSseData = z.infer<typeof sseDataSchema>
