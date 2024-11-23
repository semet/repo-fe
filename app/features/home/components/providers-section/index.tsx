import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { ProviderCard, SectionContainer } from '@/features/home'
import { TProvidersResponse } from '@/schemas/home'

type Props = {
  providers: TProvidersResponse
}

export const ProvidersSection: FC<Props> = ({ providers }) => {
  const { t } = useTranslation('home')
  const refinedProvider = providers?.data?.filter(
    (provider) => provider.image_name !== null
  )
  return (
    <SectionContainer title={t('section.provider')}>
      {refinedProvider?.map((provider) => (
        <ProviderCard
          provider={provider}
          key={provider.id}
        />
      ))}
    </SectionContainer>
  )
}
