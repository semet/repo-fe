const supportedLanguages = ['en', 'id'] as const
export default {
  // This is the list of languages your application supports
  supportedLngs: [...supportedLanguages],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: supportedLanguages[0],
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common',
  react: { useSuspense: false }
}

export const languageOptions = supportedLanguages.map((lang) => ({
  value: lang,
  label: lang.toUpperCase(),
  flag: `/flags/${lang}.svg`
}))
