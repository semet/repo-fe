import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

import { languageOptions } from '@/localization/i18n'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  return (
    <Menu
      as={'div'}
      className="relative pl-2"
    >
      <MenuButton className="text-white">
        {i18n.language.toUpperCase()}
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom"
        className="z-50 origin-top-right rounded border bg-white transition duration-100 ease-out"
      >
        {languageOptions.map((lang) => (
          <MenuItem key={lang.value}>
            <button
              onClick={() => changeLanguage(lang.value)}
              className="flex w-full items-center gap-2 px-2 text-left data-[focus]:bg-blue-100"
            >
              <img
                src={lang.flag}
                alt={lang.value}
                className="mx-auto h-4 w-4"
              />
              {lang.value.toUpperCase()}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
