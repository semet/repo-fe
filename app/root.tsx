import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunctionArgs,
  useLoaderData,
  useRouteError,
  useRouteLoaderData
} from '@remix-run/react'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import { useDehydratedState } from 'use-dehydrated-state'
import './tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import {
  getLanguageSettingsRequest,
  getStyleRequest,
  getWebMetasRequest,
  getWebSettingsRequest
} from './apis/common'
import { LayoutProvider, StyleProvider } from './contexts'
import i18next from './i18next.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request)

  const languageSettings = getLanguageSettingsRequest({
    lang: locale
  })
  const styles = await getStyleRequest()

  const webSettings = await getWebSettingsRequest()
  const webMeta = await getWebMetasRequest()

  return {
    locale,
    styles: styles.data,
    webMeta: webMeta.data,
    webSettings: webSettings.data,
    languageSettings,
    ENV: {
      API_URL: process.env.API_URL ?? '',
      API_KEY: process.env.API_KEY ?? ''
    }
  }
}

export const shouldRevalidate = ({
  actionResult
}: ShouldRevalidateFunctionArgs) => {
  return actionResult?.success === true
}

export const handle = {
  i18n: 'common'
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap'
  }
]

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>('root')
  const { i18n } = useTranslation()
  return (
    <html
      lang={loaderData?.locale}
      dir={i18n.dir()}
      className="scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-600"
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        ></meta>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${loaderData?.webSettings?.web_google_analytics.value}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${loaderData?.webSettings?.web_google_analytics.value}', {
                    page_path: window.location.pathname,
                  });
                `
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration getKey={(location) => location.pathname} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(loaderData?.ENV)}`
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { styles, ...rest } = useLoaderData<typeof loader>()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnMount: false,
            refetchOnWindowFocus: false
          }
        }
      })
  )

  const dehydratedState = useDehydratedState()
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <StyleProvider styles={styles}>
          <LayoutProvider data={rest}>
            <Outlet />
          </LayoutProvider>
        </StyleProvider>
      </HydrationBoundary>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  // eslint-disable-next-line no-console
  console.error(error)
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <h1 className="text-5xl">Shit. error</h1>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
