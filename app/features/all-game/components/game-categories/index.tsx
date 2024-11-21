import { Link, useLocation } from '@remix-run/react'
import { FC, useMemo } from 'react'
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
    <div className="mt-4 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold text-white">All Games</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">
            Permainan Favorit Saya
          </span>
          <FaAngleRight className="text-white" />
        </div>
      </div>
      <div className="flex justify-between rounded bg-secondary">
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
    </div>
  )
}
