import { useStyle } from '@/contexts'
import { HeaderTopLeft, HeaderTopRight } from '@/layouts/default'
import { convertHex, extractStyle } from '@/utils'

export const HeaderTop = () => {
  const { styles } = useStyle()
  const style = extractStyle(styles).get('desktop_homepage_announcement')
  return (
    <div
      style={{
        backgroundColor: convertHex(style?.background_color).withOpacity(
          style?.background_opacity
        )
      }}
      className="flex justify-between px-4 py-1 lg:pl-28 lg:pr-6"
    >
      <HeaderTopLeft />

      <HeaderTopRight />
    </div>
  )
}
