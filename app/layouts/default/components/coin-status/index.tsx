import { TfiReload } from 'react-icons/tfi'

import { useUser } from '@/contexts'

export const CoinStatus = () => {
  const { sseData, refreshSse } = useUser()
  return (
    <div className="flex items-center rounded bg-white px-2 py-1">
      <img
        src="/coin.png"
        alt="Coin Status"
        width={20}
        height={20}
      />

      <div className="flex-1 flex-shrink flex-grow px-2 font-semibold">
        {sseData?.data?.main_wallet?.balance}
      </div>

      <button onClick={refreshSse}>
        <TfiReload className="h-5 w-5 text-[#0372BA]" />
      </button>
    </div>
  )
}
