import { Link } from '@remix-run/react'

import { SidebarToggle } from '@/layouts/default'

export const HeaderCenterLeft = () => {
  return (
    <div className="flex items-center gap-4">
      <SidebarToggle />
      <Link to="/">
        <img
          src="/logo.gif"
          alt="Logo"
          width={140}
          height={45}
        />
      </Link>
    </div>
  )
}
