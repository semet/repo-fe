import { Link } from '@remix-run/react'

export const HeaderTopRight = () => {
  return (
    <div className="flex justify-end gap-2 divide-x divide-white">
      <Link
        to="/login"
        className="font-semibold text-secondary underline"
      >
        Kontak
      </Link>
      <Link
        to="/login"
        className="pl-2 text-white"
      >
        EN
      </Link>
    </div>
  )
}
