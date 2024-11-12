import { BullHorn } from '@/components/icons'

export const HeaderTopLeft = () => {
  return (
    <>
      <div className="flex flex-1 items-center justify-end">
        <BullHorn />
      </div>
      <div className="mx-4 w-full overflow-hidden text-sm text-white">
        <div className="w-full flex-shrink animate-marquee whitespace-nowrap">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut quisquam
          veritatis commodi !!
        </div>
      </div>
    </>
  )
}
