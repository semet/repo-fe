import { LoaderFunctionArgs } from '@remix-run/node'
import { Await, MetaFunction, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import {
  getBanks,
  getBannerCarousel,
  getFavoriteGames,
  getProviders
} from '@/apis/home'
import { useUser } from '@/contexts'
import {
  BannerCarousel,
  BannerCarouselError,
  BannerCarouselSkeleton,
  FavoriteGameSection,
  FavoriteGameSkeleton,
  PaymentMethodSkeleton,
  PaymentMethodsSection,
  ProgressiveJackpotSection,
  PromotionSection,
  PromotionSkeleton,
  ProviderSkeleton,
  ProvidersSection
} from '@/features/home'
import i18next from '@/i18next.server'
import { handleToken } from '@/libs/token'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Home'
    }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request)
  const { isTokenExpires, accessToken } = await handleToken(request)
  const bannersData = getBannerCarousel({
    language: locale ?? 'id'
  })
  const banks = getBanks()
  const providers = getProviders()
  const favoriteGames =
    accessToken && !isTokenExpires
      ? getFavoriteGames({
          accessToken
        })
      : undefined
  return {
    bannersData,
    banks,
    favoriteGames,
    providers
  }
}

const Home = () => {
  const { bannersData, banks, providers, favoriteGames } =
    useLoaderData<typeof loader>()
  const { player, accessToken } = useUser()
  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<BannerCarouselSkeleton />}>
        <Await
          resolve={bannersData}
          errorElement={<BannerCarouselError />}
        >
          {(bannersData) => <BannerCarousel banners={bannersData} />}
        </Await>
      </Suspense>

      <ProgressiveJackpotSection />

      {accessToken && player !== undefined && (
        <Suspense fallback={<FavoriteGameSkeleton />}>
          <Await resolve={favoriteGames}>
            {(favoriteGames) => (
              <FavoriteGameSection favoriteGames={favoriteGames?.data} />
            )}
          </Await>
        </Suspense>
      )}

      <Suspense fallback={<PaymentMethodSkeleton />}>
        <Await resolve={banks}>
          {(banks) => <PaymentMethodsSection banks={banks} />}
        </Await>
      </Suspense>

      <Suspense fallback={<PromotionSkeleton />}>
        <PromotionSection />
      </Suspense>

      <Suspense fallback={<ProviderSkeleton />}>
        <Await resolve={providers}>
          {(providers) => <ProvidersSection providers={providers} />}
        </Await>
      </Suspense>
    </div>
  )
}

export default Home
