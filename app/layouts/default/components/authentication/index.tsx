import { Login, Register } from '@/layouts/default'

export const Authentication = () => {
  return (
    <div className="flex items-center justify-between gap-4 md:justify-end">
      <Login />
      <Register />
    </div>
  )
}
