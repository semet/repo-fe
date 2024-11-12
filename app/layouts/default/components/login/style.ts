import { CSSProperties } from 'react'

import { TStyle } from '@/schemas/general'
import { convertHex } from '@/utils'

export const makeLoginButtonStyle = (
  styles?: TStyle['desktop_button_login']
): CSSProperties => {
  return {
    '--login-text-color': convertHex(
      styles?.login_button_text_color
    ).withOpacity(styles?.login_button_text_opacity),
    '--login-border-color': convertHex(
      styles?.login_button_border_color
    ).withOpacity(styles?.login_button_border_opacity),
    ...(styles?.style_options === 'color' && {
      '--login-bg-color': convertHex(
        styles?.login_button_background_color
      ).withOpacity(styles?.login_button_background_opacity),
      '--login-bg-color-hover': convertHex(
        styles?.login_button_background_hover_color
      ).withOpacity(styles?.login_button_background_hover_opacity),
      '--login-bg-color-active': convertHex(
        styles?.login_button_background_selected_color
      ).withOpacity(styles?.login_button_background_selected_opacity)
    }),
    ...(styles?.style_options === 'image' && {
      '--login-bg-image': `url(${styles?.login_button_image_small})`
    })
  }
}

export const makeRegisterButtonStyle = (
  styles?: TStyle['desktop_button_register']
): CSSProperties => {
  return {
    '--register-text-color': convertHex(
      styles?.register_button_text_color
    ).withOpacity(styles?.register_button_text_opacity),
    '--register-border-color': convertHex(
      styles?.register_button_border_color
    ).withOpacity(styles?.register_button_border_opacity),
    ...(styles?.style_options === 'color' && {
      '--register-bg-color': convertHex(
        styles?.register_button_background_color
      ).withOpacity(styles?.register_button_background_opacity),
      '--register-bg-color-hover': convertHex(
        styles?.register_button_background_hover_color
      ).withOpacity(styles?.register_button_background_hover_opacity),
      '--register-bg-color-active': convertHex(
        styles?.register_button_background_selected_color
      ).withOpacity(styles?.register_button_background_selected_opacity)
    }),
    ...(styles?.style_options === 'image' && {
      '--register-bg-image': `url(${styles?.register_button_image_large})`
    })
  }
}
