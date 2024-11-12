export const homeKeys = {
  bannerCarousel: ['banner-carousel'] as const,
  lastPlayedGames: ['last-played-games'] as const,
  favoriteGames: (token?: string) => ['favorite-games', token] as const,
  promotions: (params?: Record<string, unknown>) =>
    ['promotions', params] as const
}
