import { FC, PropsWithChildren } from 'react'

import { useStyle } from '@/contexts'
import { HeaderCenterLeft, HeaderCenterRight } from '@/layouts/default'
import { convertHex, extractStyle } from '@/utils'

export const HeaderCenter: FC<PropsWithChildren> = () => {
  const { styles } = useStyle()

  const style = extractStyle(styles).get('desktop_homepage_header')
  return (
    <div
      style={
        style?.style_options === 'color'
          ? {
              backgroundColor: convertHex(style?.background_color).withOpacity(
                style?.background_opacity
              )
            }
          : {
              backgroundImage: `url(${style?.background_image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '100% 100%'
            }
      }
      className="flex flex-col justify-between bg-primary px-4 py-4 md:flex-row lg:px-6"
    >
      <HeaderCenterLeft />
      <HeaderCenterRight />
    </div>
  )
}
