import { useId } from 'react'
import { FieldError, get, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { InputProps } from './type'

export const Input = <T extends Record<string, unknown>>(
  props: InputProps<T>
) => {
  const {
    id,
    name,
    rules,
    className,
    containerClassName,
    rightNode,
    label,
    labelClassName,
    errorClassName,
    required,
    type = 'text',

    ...rest
  } = props

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const generatedId = useId()

  const error: FieldError = get(errors, name)

  return (
    <div
      className={twMerge([
        containerClassName,
        'relative flex w-full flex-col gap-1'
      ])}
    >
      {label && (
        <label
          htmlFor={id ?? generatedId}
          className={twMerge(['font-semibold text-gray-700', labelClassName])}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex overflow-hidden rounded border has-[:focus]:border-blue-400">
        <input
          type={type}
          id={id ?? generatedId}
          className={twMerge([
            'w-full border-none text-gray-700 outline-none ring-0 focus:ring-0 disabled:bg-gray-200 disabled:text-gray-400',
            error
              ? 'border-rose-500 ring-rose-500'
              : 'border-gray-300 ring-gray-300',
            className
          ])}
          {...register(name, rules)}
          {...rest}
        />
        {rightNode && rightNode}
      </div>
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
