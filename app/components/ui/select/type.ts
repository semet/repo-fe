import { FieldValues, Path, RegisterOptions } from 'react-hook-form'
import type { OptionProps, Props } from 'react-select'

export type SelectProps<T extends FieldValues> = Props & {
  label?: string
  name: Path<T>
  rules?: RegisterOptions
  containerClassName?: string
  disabled?: boolean
  labelClassName?: string
  errorClassName?: string
  size?: 'sm' | 'md' | 'lg'
}

export type TOptionProps = OptionProps
