import { forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = {
  children: ReactNode
  title: string
  contentClassName?: string
  containerClassName?: string
}

type RefType = HTMLDivElement

export const SectionContainer = forwardRef<RefType, TProps>(
  ({ children, contentClassName, containerClassName, title }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge([
          'flex flex-col items-center gap-6 px-4 xl:px-24',
          containerClassName
        ])}
      >
        <h2 className="text-center text-lg font-semibold uppercase text-white">
          {title}
        </h2>
        <div
          className={twMerge([
            'flex w-full flex-wrap justify-center gap-6',
            contentClassName
          ])}
        >
          {children}
        </div>
      </div>
    )
  }
)

SectionContainer.displayName = 'SectionContainer'
