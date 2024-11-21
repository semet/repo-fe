import { FC } from 'react'

import { GameCard } from '@/features/home'
import { TLastPlayed } from '@/schemas/home'

type Props = {
  games: TLastPlayed[]
}

export const LastPlayed: FC<Props> = ({ games }) => {
  return (
    <div className="flex flex-col gap-6 bg-gray-900 px-4 2xl:px-24">
      <h1 className="text-lg font-semibold uppercase text-white">
        Last Played
      </h1>
      <div className="flex items-start gap-6">
        {games.map((game) => (
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
