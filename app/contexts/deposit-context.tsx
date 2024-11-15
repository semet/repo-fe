import { useSearchParams } from '@remix-run/react'
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react'

import {
  DpBankIcon,
  DpCryptoIcon,
  DpEwalletIcon,
  DpPulsaIcon,
  DpQrisIcon,
  DpVaIcon
} from '@/components/icons'
import {
  depositPathSchema,
  TBanksByCurrency,
  TCompanyBank,
  TDepositPath
} from '@/schemas/deposit'

import { useLayout } from './layout-context'

type SidebarItem = {
  id: number
  label: string
  link: TDepositPath
  icon: ReactNode
}

type DepositContextType = {
  banks: TBanksByCurrency[]
  companyBanks: TCompanyBank[]
  groupedBanks: Record<TBanksByCurrency['category'], TBanksByCurrency[]>
  groupedCompanyBanks: Record<TCompanyBank['bank']['category'], TCompanyBank[]>
  sidebarItems: SidebarItem[]
}

type ProviderProps = {
  children: ReactNode
  values: {
    banks: TBanksByCurrency[]
    companyBanks: TCompanyBank[]
  }
}

const DepositContext = createContext<DepositContextType | null>(null)

const DepositProvider = ({ children, values }: ProviderProps) => {
  const { banks, companyBanks } = values
  const { webSettings } = useLayout()
  const groupedBanks = useMemo(() => {
    return banks
      ?.filter((item) => [1, 2].includes(item.status))
      ?.reduce(
        (
          acc: Record<TBanksByCurrency['category'], TBanksByCurrency[]>,
          item
        ) => {
          if (!acc[item.category]) {
            acc[item.category] = []
          }
          acc[item.category].push(item)
          return acc
        },
        {} as Record<TBanksByCurrency['category'], TBanksByCurrency[]>
      )
  }, [banks])

  const groupedCompanyBanks = useMemo(() => {
    return companyBanks
      ?.filter((item) => [1].includes(item.status))
      ?.reduce(
        (
          acc: { [key in TCompanyBank['bank']['category']]: TCompanyBank[] },
          item
        ) => {
          if (!acc[item.bank.category]) {
            acc[item.bank.category] = []
          }
          acc[item.bank.category].push(item)
          return acc
        },
        {} as { [key in TCompanyBank['bank']['category']]: TCompanyBank[] }
      )
  }, [companyBanks])

  const sidebarItems = useMemo<SidebarItem[]>(() => {
    const items: SidebarItem[] = []
    if (
      webSettings?.payment_bank?.value === 'true' &&
      groupedBanks?.BANK?.length &&
      groupedCompanyBanks?.BANK?.length
    ) {
      items.push({
        id: 1,
        label: 'Bank Transfer',
        link: 'bank-transfer',
        icon: <DpBankIcon />
      })
    }

    if (
      webSettings?.payment_qris?.value === 'true' &&
      groupedBanks?.QRIS?.length &&
      groupedCompanyBanks?.QRIS?.length
    ) {
      items.push({
        id: 2,
        label: 'QRIS',
        link: 'qris',
        icon: <DpQrisIcon />
      })
    }

    if (
      webSettings?.payment_va?.value === 'true' &&
      groupedBanks?.VA?.length &&
      groupedCompanyBanks?.VA?.length
    ) {
      items.push({
        id: 3,
        label: 'VA',
        link: 'virtual-account',
        icon: <DpVaIcon />
      })
    }

    if (
      webSettings?.payment_ewallet?.value === 'true' &&
      groupedBanks?.EWALLET?.length &&
      groupedCompanyBanks?.EWALLET?.length
    ) {
      items.push({
        id: 4,
        label: 'E-Wallet',
        link: 'e-wallet',
        icon: <DpEwalletIcon />
      })
    }

    if (
      webSettings?.payment_phone_credit?.value === 'true' &&
      groupedBanks?.PULSA?.length &&
      groupedCompanyBanks?.PULSA?.length
    ) {
      items.push({
        id: 5,
        label: 'Pulsa',
        link: 'pulsa',
        icon: <DpPulsaIcon />
      })
    }

    if (
      webSettings?.payment_crypto?.value === 'true' &&
      groupedBanks?.CRYPTO?.length &&
      groupedCompanyBanks?.CRYPTO?.length
    ) {
      items.push({
        id: 6,
        label: 'Crypto',
        link: 'crypto',
        icon: <DpCryptoIcon />
      })
    }
    return items
  }, [webSettings, groupedBanks, groupedCompanyBanks])

  const sortedSidebarItems = sidebarItems.sort((a, b) =>
    a.label.localeCompare(b.label)
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const availableLinks = sidebarItems.map(({ link }) => link)
  const validatedParams = depositPathSchema.safeParse(tab)
  useEffect(() => {
    if (!tab || !validatedParams.success) {
      setSearchParams({ tab: availableLinks[0] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const providerValues = {
    ...values,
    groupedBanks,
    groupedCompanyBanks,
    sidebarItems: sortedSidebarItems
  }

  return (
    <DepositContext.Provider value={providerValues}>
      {children}
    </DepositContext.Provider>
  )
}

const useDeposit = () => {
  const context = useContext(DepositContext)
  if (!context) {
    throw new Error('useDeposit must be used within a DepositProvider')
  }
  return context
}

export { DepositProvider, useDeposit }
