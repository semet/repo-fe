export const FavoriteGameSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6 px-4 xl:px-24">
      <h2 className="text-center text-lg font-semibold text-white">Favorite</h2>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
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
    </div>
  )
}
