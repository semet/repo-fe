import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

import languages from '@/i18n'
export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const supportedLanguages = languages.supportedLngs

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
        className="z-50 w-12 origin-top-right rounded border bg-white transition duration-100 ease-out"
      >
        {supportedLanguages.map((lang) => (
          <MenuItem key={lang}>
            <button
              onClick={() => changeLanguage(lang)}
              className="block px-2 data-[focus]:bg-blue-100"
            >
              {lang.toUpperCase()}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
