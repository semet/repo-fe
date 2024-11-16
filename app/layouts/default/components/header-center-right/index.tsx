import { useUser } from '@/contexts'
import { AccountInfo, Authentication } from '@/layouts/default'

export const HeaderCenterRight = () => {
  const { player } = useUser()
  return (
    <div>{player !== undefined ? <AccountInfo /> : <Authentication />}</div>
  )
}
