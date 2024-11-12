import { CSSProperties } from 'react'

import { TStyle } from '@/schemas/general'
import { convertHex } from '@/utils'

export const makeLoginButtonStyle = (
  styles?: TStyle['desktop_button_login']
): CSSProperties => {
  return {
    '--login-text-color-lg': convertHex(
      styles?.login_button_text_color
    ).withOpacity(styles?.login_button_text_opacity),
    '--login-border-color-lg': convertHex(
      styles?.login_button_border_color
    ).withOpacity(styles?.login_button_border_opacity),
    ...(styles?.style_options === 'color' && {
      '--login-bg-color-lg': convertHex(
        styles?.login_button_background_color
      ).withOpacity(styles?.login_button_background_opacity),
      '--login-bg-color-hover-lg': convertHex(
        styles?.login_button_background_hover_color
      ).withOpacity(styles?.login_button_background_hover_opacity),
      '--login-bg-color-active-lg': convertHex(
        styles?.login_button_background_selected_color
      ).withOpacity(styles?.login_button_background_selected_opacity)
    }),
    ...(styles?.style_options === 'image' && {
      '--login-bg-image-lg': `url(${styles?.login_button_image_small})`
    })
  }
}
