import { zodResolver } from '@hookform/resolvers/zod'
import { useFetcher } from '@remix-run/react'
import { FaRegCopy } from 'react-icons/fa'
import { RemixFormProvider, useRemixForm } from 'remix-hook-form'

import { Input, Select, Textarea } from '@/components/ui'
import { useDeposit, useUser } from '@/contexts'
import {
  AmountSelector,
  PromotionPopup,
  TransferAmount,
  TransferNotice
} from '@/features/deposit'
import { createDepositSchema, TCreateDeposit } from '@/schemas/deposit'
import { currencyFormatter } from '@/utils'

export const DepositBankForm = () => {
  const { groupedBanks, groupedCompanyBanks } = useDeposit()
  const { selectedPromotion } = useDeposit()
  const { player } = useUser()
  const fetcher = useFetcher()

  const formMethods = useRemixForm<TCreateDeposit>({
    mode: 'onSubmit',
    defaultValues: {
      transaction_category_id: 2,
      bonus_id: selectedPromotion.id ?? undefined
    },
    resolver: zodResolver(createDepositSchema),
    stringifyAllValues: true,
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
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex items-end justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-white">
              Promosi <em className="text-red-600">*</em>
            </span>
            <div className="h-[40px] content-center rounded-md bg-gray-400 px-4">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-white">
                {selectedPromotion.title}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <PromotionPopup />
          </div>
        </div>
      </div>
      <RemixFormProvider {...formMethods}>
        <fetcher.Form
          method="POST"
          // action="/actions/deposit"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
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
            <div className="flex flex-col gap-4">
              <Input<TCreateDeposit>
                required
                name="amount"
                type="number"
                label="Amount"
                inputMode="numeric"
                labelClassName="text-white"
                pattern="[0-9]*"
                // rules={{
                //   onChange: (event) => inputNumberParser(event)
                // }}
              />
              <AmountSelector
                onClick={(amount) => {
                  setValue(
                    'amount',
                    (Number(watchedAmount) + Number(amount)).toString()
                  )
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
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
          </div>
          <div className="mt-14 flex justify-center gap-4">
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
        </fetcher.Form>
      </RemixFormProvider>
    </div>
  )
}
