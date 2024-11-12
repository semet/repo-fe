import { useId } from 'react'
import { Controller, FieldError, get, useFormContext } from 'react-hook-form'
import ReactSelect from 'react-select'
import { useHydrated } from 'remix-utils/use-hydrated'
import { twMerge } from 'tailwind-merge'

import { CustomOption } from './custom-option'
import { SelectProps } from './type'

export const Select = <T extends Record<string, unknown>>(
  props: SelectProps<T>
) => {
  const isHydrated = useHydrated()
  const {
    name,
    id,
    label,
    onChange,
    className,
    containerClassName,
    errorClassName,
    disabled,
    labelClassName,
    required,
    isSearchable = false,
    size = 'md',
    ...rest
  } = props
  const generatedId = useId()

  const {
    control,
    formState: { errors }
  } = useFormContext()

  const error: FieldError = get(errors, name)
  return (
    <div
      className={twMerge([
        'relative flex w-full flex-col gap-1.5',
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
      {isHydrated ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <ReactSelect
                instanceId={id ?? generatedId}
                components={{ Option: CustomOption }}
                onChange={(newValue, actionMeta) => {
                  if (onChange) {
                    onChange(newValue, actionMeta)
                  }

                  field.onChange(newValue)
                }}
                value={field.value}
                isSearchable={isSearchable}
                isDisabled={disabled}
                className={className}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: '.25rem',
                    borderColor: error ? '#f43f5e' : '#d1d5db',
                    textWrap: 'nowrap',
                    fontSize:
                      size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',

                    height:
                      size === 'sm' ? '34px' : size === 'md' ? '42px' : '54px',
                    minHeight:
                      size === 'sm' ? '34px' : size === 'md' ? '42px' : '54px',
                    '&:hover': {
                      borderColor: state.isFocused ? '#5d86ff' : '#d1d5db'
                    },
                    boxShadow: 'none',
                    backgroundColor: state.isDisabled ? '#e5e7eb' : 'white'
                  }),
                  menu: (base) => ({
                    ...base,
                    fontSize: '0.875rem'
                  }),

                  indicatorSeparator: () => ({
                    display: 'none'
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: state.isSelected ? 'black' : 'black',
                    backgroundColor: state.isSelected
                      ? 'white'
                      : state.isFocused
                        ? '#f3f4f6'
                        : 'white'
                  })
                }}
                {...rest}
              />
            )
          }}
        />
      ) : (
        <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
      )}
      {error && (
        <span
          className={twMerge([
            errorClassName,
            'absolute -bottom-4 text-xs text-rose-500'
          ])}
        >
          {error?.message?.toString()}
        </span>
      )}
    </div>
  )
}
