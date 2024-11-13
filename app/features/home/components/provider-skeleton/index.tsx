import { SectionContainer } from '@/features/home'

export const ProviderSkeleton = () => {
  return (
    <SectionContainer title="Provider">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          className="h-28 w-28 animate-pulse overflow-hidden rounded-lg border-2 bg-gray-300"
          key={index}
        />
      ))}
    </SectionContainer>
  )
}
