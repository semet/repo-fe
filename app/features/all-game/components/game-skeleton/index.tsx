export const GameSkeleton = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="flex h-32 min-w-full flex-col gap-3 overflow-hidden rounded-md"
          key={index}
        >
          <div className="h-full w-full animate-pulse bg-gray-300" />
          <div className="h-3 w-[70%] animate-pulse rounded-full bg-gray-300" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-300" />
          <div className="h-5 w-1/2 animate-pulse rounded-full bg-gray-300" />
        </div>
      ))}
    </div>
  )
}
