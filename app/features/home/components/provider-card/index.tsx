import { FC } from 'react'

import { TProvider } from '@/schemas/home'

type TProps = {
  provider: TProvider
}

export const ProviderCard: FC<TProps> = ({ provider }) => {
  return (
    <div className="h-28 w-28 overflow-hidden rounded-lg border-2 border-secondary">
      <img
        src={provider.image_name ?? ''}
        alt={provider.name}
        className="h-full w-full object-cover p-4"
      />
    </div>
  )
}
