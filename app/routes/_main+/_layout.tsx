import { data, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { EventSourceProvider, useStyle } from '@/contexts'
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
import { createEventSource } from '@/libs/event-source.server'
import { handleToken } from '@/libs/token'
import { catchLoaderError, extractStyle } from '@/utils'

// NOTE: setting cache headers will cache everything, including the SSE connection.
// so, we we refresh the page, the SSE connection will not be reconnected

// export const headers: HeadersFunction = () => {
//   return {
//     'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate'
//   }
// }

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token2 } = await handleToken(request)

  try {
    if (token2) {
      createEventSource({ token2 })
    }

    return data({
      token2
    })
  } catch (error) {
    return catchLoaderError(error)
  }
}

// IMPORTANT: if we disable the `shouldRevalidate` function, the page will not revalidate, meaning SSE will not be reconnected upon page refresh
// the trade off is, run _layout loader (meaning revalidate it) on every navigation of child routes inside it, but keeping SSE connected
// or disable _layout loader revalidation, but SSE will not be reconnected upon page refresh
export const shouldRevalidate = () => true

const MainLayout = () => {
  const loaderData = useLoaderData<typeof loader>()
  const { token2 } = loaderData
  const { styles } = useStyle()
  const style = extractStyle(styles).get('desktop_homepage_body')

  return (
    <EventSourceProvider
      value={{
        token2
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
    </EventSourceProvider>
  )
}

export default MainLayout

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _layout.tsx" />
}
