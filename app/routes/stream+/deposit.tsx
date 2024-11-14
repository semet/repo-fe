import { type LoaderFunctionArgs } from '@remix-run/node'
import { eventStream } from 'remix-utils/sse/server'

import { emitter } from '@/libs/emitter.server'

export function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    const handle = (data: string) => {
      send({
        data: data,
        event: 'deposit-event'
      })
    }

    emitter.addListener('deposit', handle)

    return () => {
      emitter.removeListener('deposit', handle)
    }
  })
}
