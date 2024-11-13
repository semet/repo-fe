import { FC } from 'react'

import { TFavoriteGamesData } from '@/schemas/home'

type TProps = {
  game: TFavoriteGamesData
}

export const GameCard: FC<TProps> = (props) => {
  const { game } = props
  return (
    <div className="flex w-full flex-col gap-2 self-center overflow-hidden rounded-md sm:w-auto">
      <div className="h-32 w-full">
        <img
          src={game.image_name}
          alt={game.name}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="mt-2 font-semibold text-white">{game.name}</span>
      <div className="bg-black-100 flex items-center gap-2">
        <img
          src={game.provider.image_name}
          alt={game.provider.name}
          className="h-6 w-6 object-contain"
        />
        <span className="font-semibold text-white">{game.provider.name}</span>
      </div>
    </div>
  )
}
