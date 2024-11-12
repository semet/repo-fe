import { FaCrown } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi'

import { useUser } from '@/contexts'

export const CurrentUser = () => {
  const { player } = useUser()

  return (
    <div className="flex items-center gap-2">
      <HiUserCircle className="h-8 w-8 text-white" />
      <span className="font-semibold text-white">Hai, {player?.username}</span>
      <div className="flex items-center gap-1 rounded bg-white px-2 py-1">
        <FaCrown className="h-6 w-6 text-gray-900" />
        <span>VIP</span>
      </div>
    </div>
  )
}
