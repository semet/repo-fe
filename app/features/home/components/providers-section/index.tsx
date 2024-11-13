import { FC } from 'react'

import { ProviderCard, SectionContainer } from '@/features/home'
import { TProvidersResponse } from '@/schemas/home'

type Props = {
  providers: TProvidersResponse
}

export const ProvidersSection: FC<Props> = ({ providers }) => {
  const refinedProvider = providers?.data?.filter(
    (provider) => provider.image_name !== null
  )
  return (
    <SectionContainer title="Provider">
      {refinedProvider?.map((provider) => (
        <ProviderCard
          provider={provider}
          key={provider.id}
        />
      ))}
    </SectionContainer>
  )
}
