import { z } from 'zod'

export const createDepositSchema = z.object({
  agent_note: z.string().optional(),
  amount: z.string(),
  bank: z.object({
    label: z.string(),
    value: z.string()
  }),
  balance: z.number().optional(),
  bonus_id: z.string().optional(),
  company_bank_account_id: z.object({
    label: z.string(),
    value: z.string()
  }),
  deposit_type: z.enum(['crypto', 'qris', 'va', 'bank_transfer']),
  player_id: z.string(),
  player_note: z.string().nullable(),
  provider_id: z.number().optional(),
  transaction_category_id: z.string()
})

export const depositResponseSchema = z.object({
  data: z.object({
    address: z.string(),
    amount: z.number(),
    bank_name: z.string(),
    credit_amount: z.number(),
    debit_amount: z.number(),
    deposit_type: z.string(),
    fee_amount: z.number(),
    id: z.string(),
    ref_id: z.string(),
    status: z.number(),
    trx_id: z.string()
  })
})

export type TDepositResponseData = z.infer<typeof depositResponseSchema>
export type TDepositResponse = TDepositResponseData['data']
export type TCreateDeposit = z.infer<typeof createDepositSchema>
