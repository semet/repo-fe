import { FC } from 'react'

type Props = {
  onClick: (amount: number) => void
}

export const AmountSelector: FC<Props> = ({ onClick }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {Array.from([10, 50, 100, 500]).map((amount) => (
        <button
          key={amount}
          type="button"
          onClick={(event) => {
            event.preventDefault()
            onClick(amount)
          }}
          className="rounded-md border-2 border-sky-600 py-2 text-sky-600 hover:bg-white"
        >
          +{amount}
        </button>
      ))}
    </div>
  )
}
