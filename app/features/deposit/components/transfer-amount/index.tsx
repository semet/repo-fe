import { FC } from 'react'

type Props = {
  currencyCode?: string
  realAmount?: string
}

export const TransferAmount: FC<Props> = ({ currencyCode, realAmount }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white">
        Nominal Transfer <em className="text-red-600">*</em>
      </span>
      <div className="flex h-[40px] items-center overflow-hidden rounded bg-gray-400">
        <div className="h-full content-center bg-gray-300 px-4">
          {currencyCode}
        </div>
        <span className="px-4 text-white">{realAmount}</span>
      </div>
    </div>
  )
}
