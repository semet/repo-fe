import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import { getPlayerRequest } from '@/apis/common'
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
import { handleToken } from '@/libs/token'
import { TPlayerResponse } from '@/schemas/general'
import { catchLoaderError, extractStyle } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isTokenExpires, accessToken } = await handleToken(request)

  try {
    let playerData: TPlayerResponse | undefined

    if (accessToken && !isTokenExpires) {
      playerData = await getPlayerRequest({ accessToken })
    }
    return {
      accessToken,
      player: playerData?.data
    }
  } catch (err) {
    return catchLoaderError(err)
  }
}

const MainLayout = () => {
  const loaderData = useLoaderData<typeof loader>()
  const { styles } = useStyle()
  const style = extractStyle(styles).get('desktop_homepage_body')
  return (
    <UserProvider value={loaderData}>
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
          <Suspense fallback={null}>
            <HeaderSecondary />
          </Suspense>
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
