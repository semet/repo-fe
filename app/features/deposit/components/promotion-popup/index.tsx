import { Radio, RadioGroup } from '@headlessui/react'
import { useState } from 'react'
import { MdCheckCircleOutline, MdOutlineCircle } from 'react-icons/md'

import { ModalDialog } from '@/components/ui'
import { useDeposit } from '@/contexts'

export const PromotionPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { promotions, selectedPromotion, setSelectedPromotion } = useDeposit()
  const refinedPromotions = [
    {
      id: null,
      title: 'Deposit tanpa promosi'
    },
    ...promotions
  ]
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap rounded-full bg-sky-400 px-4 py-1 text-white"
      >
        Ubah Promosi
      </button>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dialogClassName="pt-40"
        panelClassName="w-1/2 flex flex-col gap-4"
      >
        <RadioGroup
          value={selectedPromotion}
          onChange={setSelectedPromotion}
          aria-label="Select Promotion"
          className="space-y-4"
        >
          {refinedPromotions.map((promotion) => (
            <Radio
              key={promotion.id}
              value={promotion}
              className="group relative flex cursor-pointer rounded-lg border bg-white px-5 py-4 text-gray-800 transition data-[checked]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white focus:outline-none"
            >
              {({ checked }) => (
                <div className="flex items-center gap-4">
                  {checked ? (
                    <MdCheckCircleOutline className="text-3xl text-gray-500" />
                  ) : (
                    <MdOutlineCircle className="text-3xl text-gray-400" />
                  )}

                  <div>{promotion.title}</div>
                </div>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </ModalDialog>
    </>
  )
}
