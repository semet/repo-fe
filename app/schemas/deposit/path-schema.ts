import { z } from 'zod'

export const depositPathSchema = z.enum([
  'bank-transfer',
  'qris',
  'e-wallet',
  'virtual-account',
  'pulsa',
  'crypto'
])

export type TDepositPath = z.infer<typeof depositPathSchema>
