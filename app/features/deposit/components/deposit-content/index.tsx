import { useSearchParams } from '@remix-run/react'

import {
  DepositBankForm,
  DepositCryptoForm,
  DepositQrisForm,
  DepositVaForm
} from '@/features/deposit'

export const DepositContent = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')

  return (
    tab && (
      <>
        {['bank-transfer', 'e-wallet', 'pulsa'].includes(tab) && (
          <DepositBankForm />
        )}
        {tab === 'crypto' && <DepositCryptoForm />}
        {tab === 'qris' && <DepositQrisForm />}
        {tab === 'virtual-account' && <DepositVaForm />}
      </>
    )
  )
}
