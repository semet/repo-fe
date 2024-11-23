import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/layouts/default'

export const HeaderTopRight = () => {
  const { t } = useTranslation()
  return (
    <div className="flex justify-end gap-2 divide-x divide-white">
      <Link
        to="/login"
        className="font-semibold text-secondary"
      >
        {t('headerTop.contact')}
      </Link>
      <LanguageSwitcher />
    </div>
  )
}
