export const HeaderSecondarySkeleton = () => {
  return (
    <div className="flex gap-8">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 rounded px-2 py-2"
        >
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-500 py-4"></div>
          <div className="h-3 w-16 animate-pulse rounded-md bg-gray-500"></div>
        </div>
      ))}
    </div>
  )
}
