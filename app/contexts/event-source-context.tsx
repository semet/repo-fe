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
import { useEventSource as useRemixEventSource } from 'remix-utils/sse/react'

import { TSseData } from '@/schemas/deposit'

type EventSourceContextType = {
  token2?: string
  setToken2: Dispatch<SetStateAction<string | undefined>>
  sseData: TSseData | null
  refreshSse: () => void
}

type ProviderProps = {
  children: ReactNode
  value: {
    token2?: string
  }
}

const EventSourceContext = createContext<EventSourceContextType | null>(null)

const EventSourceProvider: FC<ProviderProps> = ({ children, value }) => {
  const [token2, setToken2] = useState<string | undefined>(value.token2)
  // const [searchParams] = useSearchParams()
  // const tab = searchParams.get('tab')
  const { revalidate } = useRevalidator()
  const data = useRemixEventSource('/stream/deposit', {
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

  const providerValues = {
    token2,
    setToken2,
    sseData,
    refreshSse: revalidate
  }

  return (
    <EventSourceContext.Provider value={providerValues}>
      {children}
    </EventSourceContext.Provider>
  )
}

const useEventSource = () => {
  const context = useContext(EventSourceContext)
  if (!context) {
    throw new Error('useEventSource must be used within a EventSourceProvider')
  }
  return context
}

export { EventSourceProvider, useEventSource }
