import { CSSProperties } from 'react'

import { TStyle } from '@/schemas/general'
import { convertHex } from '@/utils'

export const makeJackpotContainerStyles = (
  styles?: TStyle['desktop_homepage_progressiveJackpot']
): CSSProperties => {
  return {
    '--jackpot-text-color': convertHex(styles?.jackpot_text_color).toRgb(),
    '--jackpot-border-color': convertHex(
      styles?.jackpot_border_color
    ).withOpacity(styles?.jackpot_border_opacity),
    ...(styles?.style_options === 'color' && {
      '--jackpot-bg-color': convertHex(
        styles?.jackpot_background_color
      ).withOpacity(styles?.jackpot_background_opacity)
    }),
    ...(styles?.style_options === 'image' && {
      '--jackpot-bg-image': `url(${styles?.jackpot_background_image})`
    })
  }
}
