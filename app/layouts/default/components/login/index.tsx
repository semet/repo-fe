import { Link } from '@remix-run/react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ModalDialog } from '@/components/ui'
import { useStyle } from '@/contexts'
import { LoginForm } from '@/layouts/default'
import { extractStyle } from '@/utils'

import css from './index.module.css'
import { makeLoginButtonStyle, makeRegisterButtonStyle } from './style'

export const Login = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { styles } = useStyle()

  const loginStylesRaw = extractStyle(styles).get('desktop_button_login')
  const registerStylesRaw = extractStyle(styles).get('desktop_button_register')
  const loginButtonStyle = makeLoginButtonStyle(loginStylesRaw)
  const registerButtonStyle = makeRegisterButtonStyle(registerStylesRaw)
  return (
    <>
      <button
        className={twMerge([
          'min-w-32 rounded-full py-2 font-semibold',
          css.loginButton
        ])}
        style={loginButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        Login
      </button>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Login"
        dialogClassName="pt-40"
        panelClassName="w-[395px] flex flex-col gap-4"
      >
        <LoginForm onCLose={() => setIsOpen(false)} />
        <div className="inline-flex items-center gap-2">
          <span className="h-0 flex-1 border-b-2 bg-gray-600" />
          <span className="text-gray-600">Atau</span>
          <span className="h-0 flex-1 border-b-2 bg-gray-600" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Belum punya akun?</span>
          <Link
            to="/register"
            className={twMerge([
              'w-full rounded-full py-2 text-center font-semibold',
              css.registerButton
            ])}
            style={registerButtonStyle}
          >
            Daftar
          </Link>
        </div>
      </ModalDialog>
    </>
  )
}
