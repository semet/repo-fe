import { FC } from 'react'
import { MdOutlineDone } from 'react-icons/md'
import { components as Component } from 'react-select'

import { TOptionProps } from './type'

export const CustomOption: FC<TOptionProps> = (props) => {
  return (
    <Component.Option {...props}>
      <div className="flex items-center justify-between">
        <span>{(props.data as { label: string }).label}</span>
        {props.isSelected && (
          <MdOutlineDone className="h-4 w-4 text-green-500" />
        )}
      </div>
    </Component.Option>
  )
}
