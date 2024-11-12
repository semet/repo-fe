import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useFetcher, useNavigate } from '@remix-run/react'
import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { CgSpinner } from 'react-icons/cg'
import { RxReload } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

import { Checkbox, Input } from '@/components/ui'
import { useStyle } from '@/contexts'
import { useGetCaptcha } from '@/layouts/default'
import { loginSchema, TLoginForm } from '@/schemas/auth'
import { extractStyle } from '@/utils'

import css from './index.module.css'
import { makeLoginButtonStyle } from './style'

type Props = {
  onCLose: () => void
}

export const LoginForm: FC<Props> = ({ onCLose }) => {
  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password'
  )

  const {
    data: captchaData,
    refetch: refetchCaptcha,
    isLoading: isLoadingCaptcha,
    isRefetching: isRefetchingCaptcha
  } = useGetCaptcha({
    action: 'login'
  })

  const { styles } = useStyle()
  const formMethods = useForm<TLoginForm>({
    defaultValues: {
      username: '',
      password: '',
      captcha_solution: '',
      remember: false,
      captcha_id: captchaData?.data?.captcha_id
    },
    resolver: zodResolver(loginSchema)
  })

  const { handleSubmit, setValue } = formMethods

  const fetcher = useFetcher<{ success: boolean; message: string }>()
  const navigate = useNavigate()
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      fetcher.load('/')
      navigate('.', { replace: true })
      onCLose()
    }

    if (fetcher.state === 'idle' && !fetcher.data?.success) {
      refetchCaptcha()
      toast.error(fetcher.data?.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, fetcher.data?.success, fetcher.state])
  const onSubmit = handleSubmit((data) => {
    const payload = {
      captcha_id: data?.captcha_id,
      captcha_solution: data.captcha_solution,
      username: data.username,
      password: data.password,
      remember: data.remember
    }

    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        ...payload
      })
    )
    fetcher.submit(data, {
      method: 'post',
      action: '/login'
    })
  })
  useEffect(() => {
    if (!captchaData) return
    setValue('captcha_id', captchaData?.data?.captcha_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaData])

  const loginStylesRaw = extractStyle(styles).get('desktop_button_login')
  const loginButtonStyle = makeLoginButtonStyle(loginStylesRaw)
  return (
    <FormProvider {...formMethods}>
      <fetcher.Form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <Input<TLoginForm>
          name="username"
          label="Username"
          type="text"
          required
        />
        <Input<TLoginForm>
          name="password"
          label="Password"
          type={passwordType}
          required
          rightNode={
            <button
              type="button"
              className="pl-2 pr-4"
              onClick={() =>
                setPasswordType((prev) => {
                  return prev === 'password' ? 'text' : 'password'
                })
              }
            >
              {passwordType === 'password' ? (
                <AiOutlineEye className="text-xl text-gray-500" />
              ) : (
                <AiOutlineEyeInvisible className="text-xl text-gray-500" />
              )}
            </button>
          }
        />
        <div className="flex items-center justify-between gap-4">
          <Input<TLoginForm>
            name="captcha_solution"
            required
            // disabled={shouldDisableCaptcha}
            rightNode={
              <div className="border-l pl-2">
                {isLoadingCaptcha || isRefetchingCaptcha ? (
                  <div className="h-full w-24 animate-pulse bg-gray-300" />
                ) : (
                  <img
                    src={captchaData?.data?.data}
                    alt="captcha"
                    className="h-full"
                  />
                )}
              </div>
            }
          />
          <button
            type="button"
            onClick={() => refetchCaptcha()}
            className="rounded-full bg-orange-600 p-[9px] disabled:cursor-not-allowed disabled:bg-orange-600/50"
            // disabled={shouldDisableCaptcha}
          >
            <RxReload
              className={twMerge([
                'text-xl text-white'
                // isCaptchaRefetching ? 'animate-spin' : ''
              ])}
            />
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Checkbox<TLoginForm>
            name="remember"
            label="Remember me"
          />
          <Link
            to="/forgot-password"
            className="text-secondary underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          className={twMerge([
            'min-h-[44px] w-full rounded-full py-2 text-center font-semibold',
            fetcher.state === 'submitting' && 'cursor-not-allowed opacity-50',
            css.loginButtonLg
          ])}
          style={loginButtonStyle}
          type="submit"
        >
          {fetcher.state === 'submitting' ? (
            <CgSpinner className="mx-auto animate-spin text-xl" />
          ) : (
            'Login'
          )}
        </button>
      </fetcher.Form>
    </FormProvider>
  )
}
