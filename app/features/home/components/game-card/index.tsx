import { FaRegStar, FaRegPlayCircle } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { GameAll } from '@/components/icons'
import { TFavoriteGames } from '@/schemas/home'

type TProps<T> = {
  game: T & {
    favorite?: boolean
    created_at?: string
  }
} & React.HTMLAttributes<HTMLDivElement>

export const GameCard = <T extends TFavoriteGames>(props: TProps<T>) => {
  const { game, className } = props

  return (
    <div
      className={twMerge(
        'group flex w-full min-w-48 flex-col gap-2 self-center overflow-hidden rounded-lg sm:w-auto',
        className
      )}
    >
      <div className="relative h-32 w-full">
        {game.image_name !== null ? (
          <img
            src={game.image_name ?? ''}
            alt={game.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-400">
            <GameAll
              width={70}
              height={70}
            />
          </div>
        )}
        {game?.favorite && (
          <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-br-lg bg-orange-400">
            <FaRegStar className="text-xl" />
          </div>
        )}
        <div className="absolute -top-60 flex h-full w-full flex-col items-center gap-4 bg-black/60 pt-4 transition-all duration-200 ease-in-out group-hover:-top-0">
          <button className="flex w-32 items-center justify-center gap-2 rounded-full bg-blue-400 py-2 text-white">
            <FaRegPlayCircle className="text-xl" />
            <span className="text-sm">Mainkan</span>
          </button>
          <button className="flex w-32 items-center justify-center gap-2 rounded-full bg-secondary py-2 text-white">
            <FaRegStar className="text-xl" />
            <span className="text-sm">Favorit</span>
          </button>
        </div>
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
