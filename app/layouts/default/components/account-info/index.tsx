import { CoinStatus, CurrentUser, Inbox } from '@/layouts/default'

export const AccountInfo = () => {
  return (
    <div className="hidden items-center gap-4 sm:flex sm:justify-between md:justify-end">
      <Inbox />
      <CurrentUser />
      <CoinStatus />
    </div>
  )
}
