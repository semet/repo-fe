import { FC } from 'react'
import { BsInfoCircle } from 'react-icons/bs'

type Props = {
  depositFee?: number
  minDeposit?: string
  maxDeposit?: string
  currencyCode?: string
  pricePerCoin?: string
}

export const TransferNotice: FC<Props> = (props) => {
  const { currencyCode, depositFee, maxDeposit, minDeposit, pricePerCoin } =
    props
  return (
    <div className="flex items-center gap-2 rounded bg-green-200 p-3 text-green-500">
      <BsInfoCircle className="text-3xl" />
      <div className="text-sm">
        {depositFee && depositFee > 0 ? (
          <>
            Deposit dikenakan fee {depositFee}%!
            <br />
          </>
        ) : null}
        Min: {minDeposit} / Max:
        {maxDeposit} | 1 Koin = {currencyCode} {pricePerCoin}
      </div>
    </div>
  )
}
