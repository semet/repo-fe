import { ActionFunctionArgs } from '@remix-run/node'
import { XiorError } from 'xior'

import HttpServer from '@/libs/http-instance'
import { handleToken } from '@/libs/token'
import { createDepositSchema } from '@/schemas/deposit'

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  }
  const { accessToken } = await handleToken(request)
  try {
    const body = await request.formData()

    const validated = createDepositSchema.safeParse({
      amount: body.get('amount'),
      bank: JSON.parse(body.get('bank') as string),
      company_bank_account_id: JSON.parse(
        body.get('company_bank_account_id') as string
      ),
      deposit_type: body.get('deposit_type'),
      player_id: body.get('player_id'),
      player_note: body.get('player_note'),
      transaction_category_id: body.get('transaction_category_id')
    })
    if (validated.error) {
      return Response.json(validated.error, { status: 400 })
    } else {
      const { data } = validated
      const payload = {
        transaction_category_id: Number(data.transaction_category_id),
        player_id: data.player_id,
        deposit_type: 'bank_transfer',
        bank: data.bank.value,
        company_bank_account_id: data.company_bank_account_id.value,
        player_note: data.player_note,
        amount: Number(data.amount)
      }
      const { data: responseData } = await HttpServer(accessToken).post(
        '/deposits',
        payload
      )
      return Response.json({
        message: 'Deposit created successfully',
        ...responseData
      })
    }
  } catch (error) {
    if (error instanceof XiorError) {
      return Response.json(error?.response?.data, {
        status: error?.response?.status
      })
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
