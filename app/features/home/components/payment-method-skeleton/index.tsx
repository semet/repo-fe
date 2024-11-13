export const PaymentMethodSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6 px-4 xl:px-24">
      <h2 className="text-center text-lg font-semibold uppercase text-white">
        Payment Methods
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: 14 }).map((_, index) => (
          <div
            className="flex h-12 w-full animate-pulse items-center justify-center overflow-hidden rounded-[3px] bg-gray-200 sm:h-9 sm:w-28"
            key={index}
          >
            <div className="h-full w-6 flex-shrink-0 bg-gray-300"></div>

            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-full w-full bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
