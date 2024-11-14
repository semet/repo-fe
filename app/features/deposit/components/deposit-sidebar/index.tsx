import { Link, useParams } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

import { useDeposit } from '@/contexts'
import { TDepositPath } from '@/schemas/deposit'

export const DepositSidebar = () => {
  const { sidebarItems } = useDeposit()
  const { type } = useParams<{ type: TDepositPath }>()
  return (
    <div className="max-h-80 w-72 bg-primary py-4">
      <ul className="flex flex-col gap-2">
        {sidebarItems.map(({ icon, id, label, link }) => (
          <li
            key={id}
            className={twMerge([
              'text-white hover:bg-white hover:text-gray-800',
              type === link && 'bg-white text-gray-800'
            ])}
          >
            <Link
              to={`/deposit/${link}`}
              className="block p-3"
            >
              <div className="flex items-center">
                <span className="mr-2">{icon}</span>
                <span>{label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
