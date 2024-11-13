import { FC, useId } from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

type TProps = {
  onClick: () => void
  className?: string
  iconClassName?: string
}

export const BannerButton: FC<TProps> = ({
  onClick,
  className,
  iconClassName
}) => {
  const id = useId()
  return (
    <button
      id={id}
      aria-label="banner-navigation-button"
      className={twMerge(
        'carousel-navigation z-10 grid h-12 w-12 -translate-y-1/2 place-content-center rounded-full transition',
        className
      )}
      onClick={onClick}
    >
      <MdArrowBackIos className={twMerge(['text-xl', iconClassName])} />
    </button>
  )
}
