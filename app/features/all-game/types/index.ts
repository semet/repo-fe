import { TPaginationParams } from '@/types'

export type TGameParams = TPaginationParams<{
  name?: string
  status?: 1 | 2
  game_group_id?: string[]
  game_group_code?: string
  provider_id?: number[]
  provider_code?: string
  currency?: string
  tag?: string
  orderBySequence?: boolean
}>
