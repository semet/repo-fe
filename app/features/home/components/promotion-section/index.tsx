import { useLayout, useUser } from '@/contexts'
import {
  PromotionCard,
  SectionContainer,
  useGetPromotion
} from '@/features/home'

export const PromotionSection = () => {
  const { language } = useLayout()
  const { player } = useUser()
  const { data: promotions } = useGetPromotion({
    language: language ?? 'id',
    currency: player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  })
  return (
    <SectionContainer title="Hadiah & Promosi">
      {promotions?.data?.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          key={promotion.id}
        />
      ))}
    </SectionContainer>
  )
}
