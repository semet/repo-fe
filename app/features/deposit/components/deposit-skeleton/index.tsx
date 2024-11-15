export const DepositSkeleton = () => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-4 rounded-md p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 rounded-md bg-gray-400"
          />
        ))}
      </div>
    </div>
  )
}
