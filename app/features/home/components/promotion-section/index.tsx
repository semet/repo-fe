import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PromotionCard, SectionContainer } from '@/features/home'
import { TPromotion } from '@/schemas/home'

type Props = {
  promotions: TPromotion[]
}

export const PromotionSection: FC<Props> = ({ promotions }) => {
  const { t } = useTranslation('home')
  return (
    <SectionContainer title={t('section.promotion')}>
      {promotions?.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          key={promotion.id}
        />
      ))}
    </SectionContainer>
  )
}
