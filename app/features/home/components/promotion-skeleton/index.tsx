import { SectionContainer } from '@/features/home'

export const PromotionSkeleton = () => {
  return (
    <SectionContainer title="Hadiah & Promosi">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="flex w-full flex-col justify-between gap-2 overflow-hidden rounded bg-gray-800 sm:w-[40%] lg:w-[20%]"
          key={index}
        >
          <div className="h-32 animate-pulse bg-gray-300"></div>
          <div className="flex flex-col p-2">
            <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
            <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
            <div className="flex space-x-2">
              <div className="h-4 w-10 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-10 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-10 animate-pulse rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </SectionContainer>
  )
}
