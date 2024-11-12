import { WithdrawIcon } from '@/components/icons'

export const WithDraw = () => {
  return (
    <button className="flex min-w-32 items-center justify-center gap-2 rounded-full bg-teal-400 py-2 font-semibold text-white hover:bg-teal-600">
      <WithdrawIcon className="h-5 w-5" />
      Withdraw
    </button>
  )
}
