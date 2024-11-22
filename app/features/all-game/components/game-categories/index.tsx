import { Link, useLocation } from '@remix-run/react'
import { FC, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaAngleRight } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

import { getGameIcons } from '@/layouts/default'
import { TGameGroup } from '@/schemas/general'

type Props = {
  gameGroups: TGameGroup[]
}

export const GameCategories: FC<Props> = ({ gameGroups }) => {
  const { pathname } = useLocation()
  const selectedCode = pathname.split('/')[2]

  const refinedGameGroups = useMemo(() => {
    const data: TGameGroup[] = [
      {
        code: 'all-group',
        id: 'all',
        name: 'All',
        image_url: ''
      },
      ...gameGroups
    ]
    return data
  }, [gameGroups])

  const categoryIcons = useMemo(() => getGameIcons({ size: 24 }), [])
  return (
    <div className="relative mt-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold text-white">All Games</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">
            Permainan Favorit Saya
          </span>
          <FaAngleRight className="text-white" />
        </div>
      </div>
      <div className="overflow-x-auto rounded bg-secondary scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-300">
        <div className="flex">
          {refinedGameGroups?.map((menu) => (
            <div key={menu.id}>
              <Link
                className={twMerge([
                  'flex max-w-28 flex-col items-center gap-2 rounded px-8 py-4 text-sm text-[#02054E] hover:bg-yellow-100',
                  selectedCode === menu.code && 'bg-yellow-100'
                ])}
                viewTransition
                to={`/all-games/${menu.code}/all-provider`}
              >
                {categoryIcons[menu.code]?.icon ? (
                  <span>{categoryIcons[menu.code].icon}</span>
                ) : (
                  <span>{categoryIcons['default'].icon}</span>
                )}
                <span>{menu.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center overflow-hidden rounded-md bg-white has-[:focus]:shadow-[0px_0px_20px_0px_#F2BD00] xl:absolute xl:right-2 xl:top-[49px] xl:w-1/4">
        <input
          type="text"
          placeholder="Cari permainan"
          className="h-14 w-full border-none ring-0 focus:ring-0"
        />
        <FaSearch className="mr-4 text-2xl text-gray-400" />
      </div>
    </div>
  )
}
