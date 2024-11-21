import { TGameParams } from '@/features/all-game'

export const generalKeys = {
  activeStyle: ['active-style'] as const,
  player: ['player'] as const,
  captcha: ['captcha'] as const,
  webSettings: ['web-settings'] as const,
  webMeta: ['web-meta'] as const,
  language: ['language'] as const,
  gameGroup: (params?: string) => ['game-group', params] as const,
  game: (params?: TGameParams) => ['game', params] as const,
  providerGroup: (params?: string) => ['provider-group', params] as const,
  bankByCurrency: (params?: Record<string, string>) =>
    ['bank-by-currency', params] as const,
  companyBankAccounts: (accessToken?: string) =>
    ['company-bank-accounts', accessToken] as const
}
