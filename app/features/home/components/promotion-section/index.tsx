import { FC } from 'react'

import { PromotionCard, SectionContainer } from '@/features/home'
import { TPromotion } from '@/schemas/home'

type Props = {
  promotions: TPromotion[]
}

export const PromotionSection: FC<Props> = ({ promotions }) => {
  return (
    <SectionContainer title="Hadiah & Promosi">
      {promotions?.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          key={promotion.id}
        />
      ))}
    </SectionContainer>
  )
}
