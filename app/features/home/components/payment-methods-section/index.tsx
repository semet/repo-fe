import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PaymentMethodCard } from '@/features/home'
import { TBank, TBanksResponse } from '@/schemas/home'

type Props = {
  banks: TBanksResponse
}

type Accumulator = {
  [key: string]: TBank
}

export const PaymentMethodsSection: FC<Props> = ({ banks }) => {
  const { t } = useTranslation('home')
  const uniqueData = banks?.data
    ?.filter((bank) => bank.status === 1)
    .reduce<Accumulator>((acc, current) => {
      if (
        current.image_name &&
        (!acc[current.image_name] ||
          (acc[current.image_name].status !== 1 && current.status === 1))
      ) {
        acc[current.image_name] = current
      }
      return acc
    }, {} as Accumulator)

  const banksArray = Object.values(uniqueData)

  return (
    <div className="flex flex-col items-center gap-6 px-4 xl:px-24">
      <h2 className="text-center text-lg font-semibold uppercase text-white">
        {t('section.paymentMethod')}
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {banksArray?.map((bank) => (
          <PaymentMethodCard
            bank={bank}
            key={bank.id}
          />
        ))}
      </div>
    </div>
  )
}
