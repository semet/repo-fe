import { useRevalidator } from '@remix-run/react'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { useEventSource } from 'remix-utils/sse/react'

import { TSseData } from '@/schemas/deposit'
import { TPlayer } from '@/schemas/general'

type LayoutContextType = {
  player?: TPlayer
  setPlayer: Dispatch<SetStateAction<TPlayer | undefined>>
  accessToken?: string
  setAccessToken: Dispatch<SetStateAction<string | undefined>>
  token2?: string
  setToken2: Dispatch<SetStateAction<string | undefined>>
  sseData: TSseData | null
  refreshSse: () => void
  reset: () => void
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
  const [player, setPlayer] = useState<TPlayer | undefined>(value.player)
  const [accessToken, setAccessToken] = useState<string | undefined>(
    value.accessToken
  )
  const [token2, setToken2] = useState<string | undefined>(value.token2)
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
  useEffect(() => {
    revalidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- "we know better" — Moishi
  }, [])
  const reset = () => {
    setPlayer(undefined)
    setAccessToken(undefined)
    setToken2(undefined)
  }
  const providerValues = {
    player,
    setPlayer,
    accessToken,
    setAccessToken,
    token2,
    setToken2,
    reset,
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
