import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { Await, Link, useFetcher, useNavigate } from '@remix-run/react'
import { startTransition, Suspense, useEffect, useMemo } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { toast } from 'react-toastify'

import { StarOutlineIcon } from '@/components/icons'
import { useLayout, useUser } from '@/contexts'
import {
  getAuthenticatedOtherItems,
  getGameIcons,
  getOtherItems
} from '@/layouts/default'

type LogoutFetcher = {
  success: boolean
  message: string
  errorCode?: string
  statusCode?: number
}

export const SidebarToggle = () => {
  const { gameGroups } = useLayout()

  const fetcher = useFetcher<LogoutFetcher>()
  const navigate = useNavigate()
  const { player, setPlayer } = useUser()
  const categoryIcons = useMemo(() => getGameIcons({ size: 24 }), [])
  const otherItems = getOtherItems()
  const authenticatedOtherItems = getAuthenticatedOtherItems()
  useEffect(() => {
    if (fetcher.data?.success) {
      startTransition(() => {
        setPlayer(undefined)
        navigate('.', { replace: true })
      })
    }

    if (fetcher.state === 'idle' && !fetcher.data?.success) {
      toast.error(fetcher.data?.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher])
  return (
    <Menu
      as="div"
      className="relative"
    >
      {({ open, close }) => (
        <>
          <MenuButton>
            {open ? (
              <MdClose className="h-8 w-8 text-white" />
            ) : (
              <MdMenu className="h-8 w-8 text-white" />
            )}
          </MenuButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems
              anchor="bottom"
              className="absolute z-40 flex max-h-[485px] min-w-[450px] translate-y-6 flex-col overflow-y-auto bg-black py-5 text-white"
            >
              <h2 className="my-5 mt-6 px-6 text-lg font-semibold text-white">
                Permainan
              </h2>
              <div className="grid grid-cols-2 gap-x-4">
                {player && (
                  <MenuItem>
                    <Link
                      className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-white hover:text-black"
                      to="/"
                      onClick={close}
                    >
                      <StarOutlineIcon
                        width={24}
                        height={24}
                      />
                      <span>My Favorite</span>
                    </Link>
                  </MenuItem>
                )}
                <Suspense fallback={null}>
                  <Await resolve={gameGroups}>
                    {({ data: gameGroupData }) => (
                      <>
                        {gameGroupData?.map((menu) => (
                          <MenuItem key={menu.id}>
                            <Link
                              className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-white hover:text-black"
                              to="/"
                              onClick={close}
                            >
                              {categoryIcons[menu.code]?.icon ? (
                                <span>{categoryIcons[menu.code].icon}</span>
                              ) : (
                                categoryIcons.default.icon
                              )}
                              <span>{menu.name}</span>
                            </Link>
                          </MenuItem>
                        ))}
                      </>
                    )}
                  </Await>
                </Suspense>
              </div>
              <h2 className="my-3 px-6 text-lg font-semibold text-white">
                Lainnya
              </h2>
              <div className="grid grid-cols-2 gap-x-4">
                {player ? (
                  <>
                    {authenticatedOtherItems.map((item) => (
                      <MenuItem key={item.id}>
                        <Link
                          className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-white hover:text-black"
                          to={item.link}
                          onClick={close}
                        >
                          <item.icon
                            width={24}
                            height={24}
                          />
                          <span>{item.label}</span>
                        </Link>
                      </MenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    {otherItems.map((item) => (
                      <MenuItem key={item.id}>
                        <Link
                          className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-white hover:text-black"
                          to={item.link}
                          onClick={close}
                        >
                          <item.icon
                            width={24}
                            height={24}
                          />
                          <span>{item.label}</span>
                        </Link>
                      </MenuItem>
                    ))}
                  </>
                )}
              </div>
              {player && (
                <fetcher.Form
                  action="/actions/logout"
                  method="post"
                  className="mt-2 px-6"
                >
                  <input
                    type="hidden"
                    name="logout"
                  />
                  <button
                    type="submit"
                    className="w-full place-self-center rounded-full bg-red-600 py-2"
                    onClick={() => {
                      close()
                    }}
                  >
                    Logout
                  </button>
                </fetcher.Form>
              )}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  )
}
