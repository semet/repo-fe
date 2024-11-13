import { FC } from 'react'

import { TPromotion } from '@/schemas/home'

type Props = {
  promotion: TPromotion
}

export const PromotionCard: FC<Props> = ({ promotion }) => {
  return (
    <div className="flex w-full flex-col justify-between gap-2 overflow-hidden rounded bg-gray-800 sm:w-[40%] lg:w-[20%]">
      <div className="h-32">
        <img
          src={promotion.image_url}
          alt={promotion.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col p-2">
        <span className="text-white">{promotion.title}</span>
        <span className="text-white">{promotion.end_date}</span>
        <div>
          {promotion.currencies.map((currency) => (
            <span
              key={currency.id}
              className="uppercase text-white"
            >
              {currency.code}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
