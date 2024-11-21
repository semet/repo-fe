import { FC, ReactNode } from 'react'

type TProps = {
  children: ReactNode
  title?: string
}

export const PageContainer: FC<TProps> = ({ children, title }) => {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6 lg:px-24">
      {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
      {children}
    </div>
  )
}
