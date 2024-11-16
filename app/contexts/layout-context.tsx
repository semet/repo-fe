import { createContext, FC, ReactNode, useContext } from 'react'

import {
  TGameGroupResponse,
  TLanguageSettings,
  TProviderGroupResponse,
  TWebMeta,
  TWebSetting
} from '@/schemas/general'

type LayoutContextType = {
  webSettings: TWebSetting
  webMeta: TWebMeta
  languageSettings: Promise<TLanguageSettings>
  language?: string
  gameGroups: Promise<TGameGroupResponse>
  providerGroups: Promise<TProviderGroupResponse>
}

type ProviderProps = {
  children: ReactNode
  data: {
    webSettings: TWebSetting
    webMeta: TWebMeta
    languageSettings: Promise<TLanguageSettings>
    language?: string
    gameGroups: Promise<TGameGroupResponse>
    providerGroups: Promise<TProviderGroupResponse>
  }
}

const LayoutContext = createContext<LayoutContextType | null>(null)

const LayoutProvider: FC<ProviderProps> = ({ children, data }) => {
  return (
    <LayoutContext.Provider value={data}>{children}</LayoutContext.Provider>
  )
}

const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

export { LayoutProvider, useLayout }
