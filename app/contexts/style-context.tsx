import { createContext, FC, ReactNode, useContext } from 'react'

import { TStyle } from '@/schemas/general'

type LayoutContextType = {
  styles: TStyle
}

type ProviderProps = {
  children: ReactNode
  values: TStyle
}

const StyleContext = createContext<LayoutContextType | null>(null)

const StyleProvider: FC<ProviderProps> = ({ children, values }) => {
  return (
    <StyleContext.Provider value={{ styles: values }}>
      {children}
    </StyleContext.Provider>
  )
}

const useStyle = () => {
  const context = useContext(StyleContext)
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider')
  }
  return context
}

export { StyleProvider, useStyle }
