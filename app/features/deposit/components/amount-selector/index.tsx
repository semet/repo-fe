import { FC } from 'react'

type Props = {
  onClick: (amount: number) => void
}

export const AmountSelector: FC<Props> = ({ onClick }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from([10, 50, 100, 500]).map((amount) => (
        <button
          key={amount}
          type="button"
          onClick={(event) => {
            event.preventDefault()
            onClick(amount)
          }}
          className="rounded-md border-2 border-sky-600 px-4 py-2 text-sky-600 hover:bg-white"
        >
          +{amount}
        </button>
      ))}
    </div>
  )
}
