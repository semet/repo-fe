import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  AccountIcon,
  CoinPromotionIcon,
  GameCasino,
  GameCockFight,
  GameEsport,
  GameFishShoot,
  GameGeneral,
  GameLottery,
  GameSlot,
  GameSport,
  RecentTransactionIcon,
  ReferralIcon
} from '@/components/icons'
import { ObjectIndex } from '@/types'

type Params = {
  size?: number
  center?: boolean
}

export const getGameIcons = (params: Params) => {
  const { size = 35, center = true } = params

  const categoryIcons: ObjectIndex<string, Record<string, ReactNode>> = {
    default: {
      icon: (
        <GameGeneral
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    sports: {
      icon: (
        <GameSport
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    slots: {
      icon: (
        <GameSlot
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    lottery: {
      icon: (
        <GameLottery
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    games: {
      icon: (
        <GameCasino
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    fishing: {
      icon: (
        <GameFishShoot
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    esports: {
      icon: (
        <GameEsport
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    cockfight: {
      icon: (
        <GameCockFight
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    casino: {
      icon: (
        <GameCasino
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    }
  }

  return categoryIcons
}

export const getAuthenticatedOtherItems = () => [
  {
    id: 1,
    label: 'Akun',
    icon: AccountIcon,
    link: '/profile'
  },
  {
    id: 2,
    label: 'Riwayat',
    icon: RecentTransactionIcon,
    link: '/history'
  }
]

export const getOtherItems = () => [
  {
    id: 1,
    label: 'Promosi',
    icon: CoinPromotionIcon,
    link: '/promotion'
  },
  {
    id: 2,
    label: 'Referral',
    icon: ReferralIcon,
    link: '/referral'
  }
]
