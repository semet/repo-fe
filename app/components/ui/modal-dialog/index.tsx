import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

type TProps = PropsWithChildren<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title: string
  dialogClassName?: string
  panelClassName?: string
}>

export const ModalDialog: FC<TProps> = (props) => {
  const {
    children,
    isOpen,
    setIsOpen,
    title,
    dialogClassName,
    panelClassName
  } = props
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className={twMerge([
        'fixed inset-0 z-50 flex w-screen items-start justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0',
        dialogClassName
      ])}
    >
      <DialogPanel
        className={twMerge(['rounded bg-white p-6 shadow-lg', panelClassName])}
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <button onClick={() => setIsOpen(false)}>
            <IoCloseOutline className="text-3xl text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        {children}
      </DialogPanel>
    </Dialog>
  )
}
