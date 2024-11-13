import { useAsyncError } from '@remix-run/react'

export const BannerCarouselError = () => {
  const error = useAsyncError()
  const errorData =
    error instanceof Error && error.message ? JSON.parse(error.message) : null
  return (
    <div className="relative flex aspect-[360/137] flex-[0_0_100%] flex-col items-center justify-center bg-gray-400">
      <h2 className="text-xl font-semibold text-rose-700 underline">
        Error in BannerCarousel
      </h2>
      <div>
        {errorData && (
          <pre className="flex flex-col">
            <pre>Message:{errorData?.message}</pre>
            <pre>Status:{errorData?.status}</pre>
          </pre>
        )}
      </div>
    </div>
  )
}
