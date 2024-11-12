export const parseLanguageFromHeaders = (headers: Headers) => {
  const language = headers
    .get('Accept-Language')
    ?.split(',')
    .map((lang) => (lang.includes('-') ? lang.split('-')[0] : lang))[0]
  return language
}

export const extractCookieFromHeaders = (headers: Headers, name: string) => {
  const cookie = headers
    .get('Cookie')
    ?.split(';')
    .find((cookie) => cookie.includes(name))
    ?.split('=')[1]
    .trim()
  return cookie
}

export const currencyFormatter = (
  amount: number,
  options?: Intl.NumberFormatOptions,
  isTruncated: boolean = false
) => {
  if (!options) {
    options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  }

  if (isTruncated) {
    // Determine the factor based on the maximum fraction digits
    const factor = Math.pow(10, options.maximumFractionDigits || 2)

    // Truncate the amount based on the maximum fraction digits
    amount = Math.floor(amount * factor) / factor
  }

  return amount?.toLocaleString('en-US', options)
}

export const flattenObject = <T extends Record<string, unknown>>(obj: T) => {
  const flattedObject = Object.keys(obj).reduce<Record<string, unknown>>(
    (acc, key) => {
      const entry = obj[key]

      if (
        typeof entry === 'object' &&
        entry !== null &&
        'label' in entry &&
        'value' in entry
      ) {
        acc[key] = entry.value
      } else {
        acc[key] = entry
      }

      return acc
    },
    {}
  )
  return flattedObject
}
