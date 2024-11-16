import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { useState } from 'react'

import { ModalDialog } from '@/components/ui'
import { useDeposit } from '@/contexts'

export const PromotionPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { promotions, selectedPromotion, setSelectedPromotion } = useDeposit()
  const refinedPromotions = [
    ...promotions,
    {
      id: null,
      title: 'Deposit tanpa promosi'
    }
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
        title="Login"
        dialogClassName="pt-40"
        panelClassName="w-1/2 flex flex-col gap-4"
      >
        <RadioGroup
          value={selectedPromotion}
          onChange={setSelectedPromotion}
          aria-label="Server size"
        >
          {refinedPromotions.map((promotion) => (
            <Field
              key={promotion.id}
              className="flex items-center gap-2"
            >
              <Radio
                value={promotion}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label>{promotion.title}</Label>
            </Field>
          ))}
        </RadioGroup>
      </ModalDialog>
    </>
  )
}
