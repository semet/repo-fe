import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { GameCard } from '@/features/home'
import { TLastPlayed } from '@/schemas/home'

type Props = {
  games?: TLastPlayed[]
}

export const LastPlayed: FC<Props> = ({ games }) => {
  const { t } = useTranslation('all-game')
  return (
    <div className="flex flex-col gap-6 px-4 2xl:px-24">
      <h1 className="text-lg font-semibold uppercase text-white">
        {t('header.lastPlayed')}
      </h1>
      <div className="flex items-start gap-6 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary">
        {games?.map((game) => (
          <GameCard<TLastPlayed>
            key={game.id}
            game={game}
            className="self-start"
          />
        ))}
      </div>
    </div>
  )
}
