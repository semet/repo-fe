import { LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  ShouldRevalidateFunctionArgs,
  useLoaderData
} from '@remix-run/react'

import {
  getGameGroupRequest,
  getPlayerRequest,
  getProviderGroupRequest
} from '@/apis/common'
import { UserProvider, useStyle } from '@/contexts'
import {
  FooterContainer,
  FooterLeft,
  FooterRight,
  HeaderBottom,
  HeaderCenter,
  HeaderPrimary,
  HeaderSecondary,
  HeaderTop
} from '@/layouts/default'
import { ErrorWrapper } from '@/layouts/error'
import { handleToken } from '@/libs/token'
import { TPlayerResponse } from '@/schemas/general'
import { catchLoaderError, extractStyle } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isTokenExpires, accessToken } = await handleToken(request)
  try {
    let playerData: TPlayerResponse | undefined
    const currencyCode =
      playerData?.data?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
    const gameGroup = getGameGroupRequest({
      currency: currencyCode
    })
    const providerGroup = getProviderGroupRequest({
      currency: currencyCode
    })
    if (accessToken && !isTokenExpires) {
      playerData = await getPlayerRequest({ accessToken })
    }

    return {
      accessToken,
      player: playerData?.data,
      gameGroup: gameGroup,
      providerGroup
    }
  } catch (err) {
    return catchLoaderError(err)
  }
}

export const shouldRevalidate = ({
  actionResult,
  defaultShouldRevalidate
}: ShouldRevalidateFunctionArgs) => {
  if (actionResult?.success) {
    return true
  }
  return defaultShouldRevalidate
}

const MainLayout = () => {
  const loaderData = useLoaderData<typeof loader>()
  const { accessToken, player } = loaderData
  const { styles } = useStyle()
  const style = extractStyle(styles).get('desktop_homepage_body')
  return (
    <UserProvider
      value={{
        accessToken,
        player
      }}
    >
      <main
        className="h-full bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${style?.background_body_image})`
        }}
      >
        <HeaderPrimary>
          <HeaderTop />
          <HeaderCenter />
          <HeaderBottom />
          <HeaderSecondary />
        </HeaderPrimary>
        <div className="min-h-screen">
          <Outlet />
        </div>
        <FooterContainer>
          <FooterLeft />
          <FooterRight />
        </FooterContainer>
      </main>
    </UserProvider>
  )
}

export default MainLayout

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _layout.tsx" />
}
