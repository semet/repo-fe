import { useId } from 'react'
import { FieldError, get } from 'react-hook-form'
import { useRemixFormContext } from 'remix-hook-form'
import { twMerge } from 'tailwind-merge'

import { TextareaProps } from './type'

export const Textarea = <T extends Record<string, unknown>>(
  props: TextareaProps<T>
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
        'relative flex w-full flex-col gap-1',
        containerClassName
      ])}
    >
      {label && (
        <label
          htmlFor={id ?? generatedId}
          className={twMerge(['text-gray-700', labelClassName])}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={id ?? generatedId}
        className={twMerge([
          'w-full rounded border-none text-gray-700 outline-none ring-0 focus:ring-0 disabled:bg-gray-200 disabled:text-gray-400',
          error
            ? 'border-rose-500 ring-rose-500'
            : 'border-gray-300 ring-gray-300',
          className
        ])}
        {...register(name, rules)}
        {...rest}
      />
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
