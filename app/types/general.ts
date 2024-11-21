import { TResponseMeta } from '@/schemas/home'

export type TParamsWithToken<T = object> = { accessToken?: string } & T

export type ObjectIndex<
  T extends string | number | symbol = string,
  U = string
> = {
  [key in T]: U
}

export type TPaginationParams<T> = {
  page?: number
  limit?: number
  sort?: string
  order?: string
} & T
