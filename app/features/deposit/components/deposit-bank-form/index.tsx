import { zodResolver } from '@hookform/resolvers/zod'
import { useFetcher } from '@remix-run/react'
import { FaRegCopy } from 'react-icons/fa'
import { RemixFormProvider, useRemixForm } from 'remix-hook-form'

import { Input, Select, Textarea } from '@/components/ui'
import { useDeposit, useUser } from '@/contexts'
import {
  AmountSelector,
  TransferAmount,
  TransferNotice
} from '@/features/deposit'
import { createDepositSchema, TCreateDeposit } from '@/schemas/deposit'
import { currencyFormatter } from '@/utils'

export const DepositBankForm = () => {
  const { groupedBanks, groupedCompanyBanks } = useDeposit()
  const { player } = useUser()
  const fetcher = useFetcher()

  const formMethods = useRemixForm<TCreateDeposit>({
    mode: 'onSubmit',
    defaultValues: {
      transaction_category_id: 2
    },
    resolver: zodResolver(createDepositSchema),
    stringifyAllValues: false,
    submitConfig: {
      action: '/actions/deposit'
    },
    fetcher
  })

  const { watch, setValue, handleSubmit } = formMethods

  const {
    bank: watchedBank,
    amount: watchedAmount,
    company_bank_account_id: watchedCompanyBank
  } = watch()

  const bankOptions = groupedBanks.BANK.map((bank) => ({
    label: bank.name,
    value: bank.id
  }))

  const companyBankOptions = groupedCompanyBanks.BANK.filter(
    (companyBank) => companyBank.bank_id === watchedBank?.value
  ).map((companyBank) => ({
    label: `${companyBank.account_name} - ${companyBank.account_no}`,
    value: companyBank.id
  }))

  const pricePerCoin = player?.account?.bank?.currency?.price_per_coin ?? 0
  const currencyCode = player?.account?.bank?.currency.code

  const selectedBank = groupedBanks.BANK.find(
    (bank) => bank.id === watchedBank?.value
  )
  const selectedCompanyBank = groupedCompanyBanks.BANK.find(
    (companyBank) => companyBank?.id === watchedCompanyBank?.value
  )
  const minDepositLimit = currencyFormatter(
    selectedBank?.player_min_deposit ?? 0,
    { minimumFractionDigits: 0 }
  )
  const maxDepositLimit = currencyFormatter(
    selectedBank?.player_max_deposit ?? 0,
    { minimumFractionDigits: 0 }
  )
  const realAmount = currencyFormatter(Number(watchedAmount) * pricePerCoin, {
    minimumFractionDigits: 0
  })
  const pricePerCoinFormatted = currencyFormatter(pricePerCoin, {
    minimumFractionDigits: 0
  })

  const depositFee = selectedCompanyBank?.cuts ?? 0
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-white">
              Promosi <em className="text-red-600">*</em>
            </span>
            <div className="rounded-md bg-gray-400 px-2">
              <span className="text-white">Bonus Deposit 100%</span>
            </div>
          </div>
          <div>
            <button className="rounded-full bg-sky-400 px-4 py-1 text-white">
              Ubah Promosi
            </button>
          </div>
        </div>
      </div>
      <RemixFormProvider {...formMethods}>
        <fetcher.Form
          method="POST"
          // action="/actions/deposit"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Select<TCreateDeposit>
              required
              labelClassName="text-white"
              label="Bank Transfer"
              name="bank"
              options={bankOptions}
            />
            <div className="flex items-end gap-1">
              <Select<TCreateDeposit>
                disabled={!watchedBank}
                placeholder={watchedBank ? 'Pilih Bank' : 'Pilih Bank Transfer'}
                required
                labelClassName="text-white"
                label="Bank Transfer"
                name="company_bank_account_id"
                options={companyBankOptions}
              />
              <button
                type="button"
                className="h-[42px] rounded bg-sky-400 p-2"
              >
                <FaRegCopy className="text-2xl text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Input<TCreateDeposit>
                required
                name="amount"
                type="number"
                label="Amount"
                inputMode="numeric"
                labelClassName="text-white"
                pattern="[0-9]*"
              />
              <AmountSelector
                onClick={(amount) => {
                  setValue('amount', Number(watchedAmount) + Number(amount))
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <TransferAmount
                currencyCode={currencyCode}
                realAmount={realAmount}
              />
              <TransferNotice
                currencyCode={currencyCode}
                depositFee={depositFee}
                maxDeposit={maxDepositLimit}
                minDeposit={minDepositLimit}
                pricePerCoin={pricePerCoinFormatted}
              />
            </div>
            <Textarea<TCreateDeposit>
              name="player_note"
              label="Berita"
              labelClassName="text-white"
            />
            {/* Hidden inputs */}
            {/* <Input<TCreateDeposit>
              containerClassName="hidden"
              className="hidden"
              type="hidden"
              name="transaction_category_id"
              defaultValue={2}
            /> */}
            <Input<TCreateDeposit>
              containerClassName="hidden"
              className="hidden"
              type="hidden"
              name="player_id"
              defaultValue={player?.id}
            />
            <Input<TCreateDeposit>
              containerClassName="hidden"
              className="hidden"
              type="hidden"
              name="deposit_type"
              defaultValue={'bank_transfer'}
            />
            <div className="col-span-2 mx-auto mt-14 flex gap-4">
              <button
                type="reset"
                className="w-32 rounded-full bg-secondary py-2 text-gray-800"
              >
                Deposit
              </button>
              <button
                type="submit"
                className="w-32 rounded-full bg-sky-400 py-2 text-white"
              >
                Deposit
              </button>
            </div>
          </div>
        </fetcher.Form>
      </RemixFormProvider>
    </div>
  )
}
