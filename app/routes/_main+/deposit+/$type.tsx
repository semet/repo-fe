import { LoaderFunctionArgs } from '@remix-run/node'

export const loader = async (_args: LoaderFunctionArgs) => {
  return {
    success: true
  }
}

const DepositPage = () => {
  return <div>DepositPage</div>
}

export default DepositPage
