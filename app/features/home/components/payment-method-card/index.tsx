import { FC } from 'react'

import { TBank } from '@/schemas/home'

type Props = {
  bank: TBank
}

export const PaymentMethodCard: FC<Props> = ({ bank }) => {
  return (
    <div className="flex h-12 w-full items-center justify-center overflow-hidden rounded-[3px] bg-white text-center sm:h-9 sm:w-28">
      <div className="h-full w-6 flex-shrink-0 bg-green-600"></div>

      <div className="flex h-full w-full items-center justify-center">
        <div className="relative">
          <img
            title={bank.name}
            src={bank.image_name ?? ''}
            alt={bank.name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
