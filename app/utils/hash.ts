import md5 from 'md5'

// Define a type for the generic object structure
type QueryObject = { [key: string]: string | number | boolean | undefined }

const objectToQueryString = (obj: QueryObject): string => {
  const pairs: string[] = []
  for (const key in obj) {
    pairs.push(key + '=' + obj[key])
  }
  pairs.sort((a, b) => a.localeCompare(b))
  return pairs.join('&')
}

type DataObject = { first: string | number; second: string | number }

export const createObject = (
  firstDigit: number,
  secondDigit: number,
  data: DataObject
): QueryObject => {
  return {
    [`input.${firstDigit}`]: data.first,
    [`input.${secondDigit}`]: data.second
  }
}

export const hashText = (obj: QueryObject): string => {
  const params = objectToQueryString(obj)
  const hashFunc = md5(`${params}${process.env.SALT_KEY}`)
  return hashFunc
}
