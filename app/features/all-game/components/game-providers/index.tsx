import { Link, useLocation } from '@remix-run/react'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { AllProviderIcon } from '@/components/icons'
import { TProvider } from '@/schemas/home'

type Props = {
  providers: TProvider[]
}

export const GameProviders: FC<Props> = ({ providers }) => {
  const { t } = useTranslation('all-game')
  const { pathname } = useLocation()
  const selectedGroup = pathname.split('/')[2]
  const selectedProvider = pathname.split('/')[3]
  const [showAll, setShowAll] = useState<boolean>(false)
  const filteredProviders = providers.filter(
    (provider) => provider.total_game > 0
  )
  const refinedProviders: TProvider[] = [
    {
      id: 1,
      name: 'All',
      image_name: '',
      code: 'all-provider',
      merchant_id: 0,
      sequence: 0,
      status: 1,
      total_game: 0
    },
    ...filteredProviders
  ]
  return (
    <div className="flex flex-col gap-4">
      <div
        className={twMerge([
          'mt-4 grid grid-cols-2 gap-4 overflow-hidden transition-all duration-300 sm:grid-cols-4 md:grid-cols-6',
          showAll ? 'max-h-[500px]' : 'max-h-24'
        ])}
      >
        {refinedProviders.map((provider) => (
          <Link
            to={`/all-games/${selectedGroup}/${provider.code}`}
            key={provider.id}
            className={twMerge([
              'flex h-10 items-center justify-center gap-2 rounded border border-secondary hover:text-white hover:shadow-[0px_0px_20px_0px_#F2BD00]',
              selectedProvider === provider.code && 'bg-secondary text-white'
            ])}
          >
            {provider.image_name ? (
              <img
                src={provider.image_name}
                alt={provider.name}
                width={24}
                height={24}
              />
            ) : (
              <AllProviderIcon />
            )}
            <span className="text-xs">{provider.name}</span>
          </Link>
        ))}
      </div>
      <hr />
      <div className="mx-auto">
        <button
          className="text-white"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? t('provider.showLess') : t('provider.showAll')}
        </button>
      </div>
    </div>
  )
}
