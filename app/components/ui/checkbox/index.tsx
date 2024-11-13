import { useId } from 'react'
import { FieldError, get } from 'react-hook-form'
import { useRemixFormContext } from 'remix-hook-form'
import { twMerge } from 'tailwind-merge'

import { InputProps } from './type'

export const Checkbox = <T extends Record<string, unknown>>(
  props: InputProps<T>
) => {
  const {
    id,
    name,
    rules,
    className,
    containerClassName,
    label,
    labelClassName,
    errorClassName,
    required,
    type = 'checkbox',

    ...rest
  } = props

  const {
    register,
    formState: { errors }
  } = useRemixFormContext()

  const generatedId = useId()

  const error: FieldError = get(errors, name)

  return (
    <div
      className={twMerge([
        containerClassName,
        'relative flex items-center gap-2'
      ])}
    >
      <input
        type={type}
        id={id ?? generatedId}
        className={twMerge([
          'checked:bg-secotext-secondary h-5 w-5 rounded text-secondary focus:border-none focus:text-secondary focus:outline-none focus:ring-0 disabled:bg-gray-200 disabled:text-gray-400',
          error
            ? 'border-rose-500 ring-rose-500'
            : 'border-gray-300 ring-gray-300',
          className
        ])}
        {...register(name, rules)}
        {...rest}
      />

      {label && (
        <label
          htmlFor={id ?? generatedId}
          className={twMerge([labelClassName, 'text-gray-700'])}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      {error && (
        <span
          className={twMerge([
            errorClassName,
            'absolute -bottom-4 text-xs font-semibold italic text-rose-500'
          ])}
        >
          *{error?.message?.toString()}
        </span>
      )}
    </div>
  )
}
