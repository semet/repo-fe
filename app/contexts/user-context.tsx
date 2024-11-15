import { useRevalidator } from '@remix-run/react'
import { createContext, FC, ReactNode, useContext } from 'react'
import { useEventSource } from 'remix-utils/sse/react'

import { TSseData } from '@/schemas/deposit'
import { TPlayer } from '@/schemas/general'

type LayoutContextType = {
  player?: TPlayer
  accessToken?: string
  token2?: string
  sseData: TSseData | null
  refreshSse: () => void
}

type ProviderProps = {
  children: ReactNode
  value: {
    player?: TPlayer
    accessToken?: string
    token2?: string
  }
}

const UserContext = createContext<LayoutContextType | null>(null)

const UserProvider: FC<ProviderProps> = ({ children, value }) => {
  // const [searchParams] = useSearchParams()
  // const tab = searchParams.get('tab')
  const { revalidate } = useRevalidator()
  const data = useEventSource('/stream/deposit', {
    event: 'deposit-event',
    enabled: true
  })
  const sseData =
    data !== null && typeof data === 'string'
      ? (JSON.parse(data) as TSseData)
      : null
  // useEffect(() => {
  //   if (!tab) return
  //   revalidate()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps -- "we know better" — Moishi
  // }, [data, tab])

  const providerValues = {
    ...value,
    sseData,
    refreshSse: revalidate
  }

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
