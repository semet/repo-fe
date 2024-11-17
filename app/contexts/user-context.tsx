import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

import { TPlayer } from '@/schemas/general'

type UserContextType = {
  player?: TPlayer
  setPlayer: Dispatch<SetStateAction<TPlayer | undefined>>
  accessToken?: string
  setAccessToken: Dispatch<SetStateAction<string | undefined>>
  refreshToken?: string
  setRefreshToken: Dispatch<SetStateAction<string | undefined>>
  reset: () => void
}

type ProviderProps = {
  children: ReactNode
  values: {
    player?: TPlayer
    accessToken?: string
    refreshToken?: string
  }
}

const UserContext = createContext<UserContextType | null>(null)

const UserProvider: FC<ProviderProps> = ({ children, values: value }) => {
  const [player, setPlayer] = useState<TPlayer | undefined>(value.player)
  const [accessToken, setAccessToken] = useState<string | undefined>(
    value.accessToken
  )
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    value.refreshToken
  )

  const reset = () => {
    setPlayer(undefined)
    setAccessToken(undefined)
    setRefreshToken(undefined)
  }
  const providerValues = {
    player,
    setPlayer,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    reset
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
