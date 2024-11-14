import { zodResolver } from '@hookform/resolvers/zod'
import { ActionFunctionArgs } from '@remix-run/node'
import { getValidatedFormData } from 'remix-hook-form'

import HttpInstance from '@/libs/http-instance'
import { handleToken } from '@/libs/token'
import { createDepositSchema, TCreateDeposit } from '@/schemas/deposit'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { accessToken } = await handleToken(request)
  const {
    errors,
    data: formData,
    receivedValues: defaultValues
  } = await getValidatedFormData<TCreateDeposit>(
    request,
    zodResolver(createDepositSchema),
    false
  )
  if (errors) {
    return Response.json(
      { success: false, errors, defaultValues },
      { status: 400 }
    )
  }

  const payload = {
    transaction_category_id: formData.transaction_category_id,
    player_id: formData.player_id,
    deposit_type: formData.deposit_type,
    bank: formData.bank.value,
    company_bank_account_id: formData.company_bank_account_id.value,
    player_note: formData.player_note,
    amount: Number(formData.amount)
  }

  try {
    const { data } = await HttpInstance(accessToken).post('/deposits', payload)
    return Response.json({ success: true, data }, { status: 201 })
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 })
  }
}
