import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { FC, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { BannerButton } from '@/features/home'
import { useEmblaScroll } from '@/hooks'
import { TBanner } from '@/schemas/home'

type Props = {
  banners: TBanner
}

export const BannerCarousel: FC<Props> = ({ banners }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true
    },
    [Autoplay({ delay: 5_000 })]
  )

  const { scrollSnaps, onDotButtonClick, selectedIndex } =
    useEmblaScroll(emblaApi)

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  return (
    <div className="relative flex flex-col gap-5 overflow-hidden">
      <div ref={emblaRef}>
        <div className="flex">
          {banners?.data
            ?.filter((item) => item.picture_url)
            .map((item) => (
              <div
                key={item.id}
                className={twMerge([
                  'relative block aspect-[360/137] flex-[0_0_100%] bg-cover bg-center bg-no-repeat'
                ])}
                style={{
                  backgroundImage: `url(${item.picture_url})`
                }}
              >
                {/* <img
                  src={item.picture_url}
                  alt="banner"
                  loading="lazy"
                  className="animate-pulse bg-slate-500 object-cover"
                  onLoad={(event) => {
                    event.currentTarget.classList.remove('bg-slate-500')
                    event.currentTarget.classList.remove('animate-pulse')
                  }}
                /> */}
              </div>
            ))}
        </div>
      </div>
      <BannerButton
        onClick={scrollPrev}
        className="absolute left-11 top-1/2 bg-red-400"
        iconClassName="ml-2"
      />
      <BannerButton
        onClick={scrollNext}
        className="absolute right-11 top-1/2 bg-teal-500"
        iconClassName="rotate-180 mr-2"
      />
      <div className="flex items-center justify-center gap-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            aria-label="scroll-snap-button"
            onClick={() => onDotButtonClick(index)}
            id={`scroll-snap-${index}`}
            key={index}
            className={twMerge(
              'h-2.5 rounded-[20px] bg-red-400 transition-all duration-300 ease-in-out',
              index === selectedIndex
                ? 'w-[60px] rounded-[20px]'
                : 'w-2.5 bg-white'
            )}
          ></button>
        ))}
      </div>
    </div>
  )
}
