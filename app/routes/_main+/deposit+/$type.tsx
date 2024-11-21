import { LoaderFunctionArgs } from '@remix-run/node'
import { useParams } from '@remix-run/react'

import {
  DepositBankForm,
  DepositCryptoForm,
  DepositQrisForm,
  DepositVaForm
} from '@/features/deposit'
import { TDepositPath } from '@/schemas/deposit'

export const loader = async (_: LoaderFunctionArgs) => {
  return {
    success: true
  }
}

export const shouldRevalidate = () => true

const DepositPage = () => {
  const { type } = useParams<{ type: TDepositPath }>()

  return (
    type && (
      <>
        {['bank-transfer', 'e-wallet', 'pulsa'].includes(type) && (
          <DepositBankForm />
        )}
        {type === 'crypto' && <DepositCryptoForm />}
        {type === 'qris' && <DepositQrisForm />}
        {type === 'virtual-account' && <DepositVaForm />}
      </>
    )
  )
}

export default DepositPage
