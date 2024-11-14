import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useParams } from '@remix-run/react'

import {
  DepositBankForm,
  DepositCryptoForm,
  DepositQrisForm,
  DepositVaForm
} from '@/features/deposit'
import { depositPathSchema, TDepositPath } from '@/schemas/deposit'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const parsedParams = depositPathSchema.safeParse(params.type)

  if (!parsedParams.success) {
    throw redirect('/deposit')
  }

  return {
    success: true
  }
}

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
