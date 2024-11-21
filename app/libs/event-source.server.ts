/* eslint-disable no-console */
import { EventSourcePolyfill } from 'event-source-polyfill'

import { emitter } from './emitter.server'

export function createEventSource({ token2 }: { token2: string }) {
  const eventSource = new EventSourcePolyfill('https://be.i88.dev/sse/pl', {
    headers: {
      Authorization: `Bearer ${token2}`,
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive'
    },
    // one hour timeout
    heartbeatTimeout: 3600000
  })

  let inactivityTimeout: NodeJS.Timeout
  const inactivityLimit = 3 * 60 * 1000 // 3 minutes
  const resetInactivityTimer = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout)
    }
    inactivityTimeout = setTimeout(() => {
      console.warn('Closing SSE due to inactivity')
      eventSource.close()
      // Optionally, trigger a reconnect if needed
    }, inactivityLimit)
  }

  eventSource.onopen = () => {
    console.log('SSE Connected 🚀🚀')
    resetInactivityTimer()
  }

  eventSource.onmessage = (event) => {
    emitter.emit('deposit', event.data)
    resetInactivityTimer() // Reset timer on every message
  }

  eventSource.onerror = ({ target }) => {
    eventSource.close()
    console.error('SSE error 💥💥', target)

    // Clear inactivity timeout on error to avoid duplicate close attempts
    clearTimeout(inactivityTimeout)

    // Retry connection after a delay
    setTimeout(() => {
      console.log('Reconnecting...')
      createEventSource({ token2 }) // Reinitialize EventSource
    }, 5000)
  }

  return eventSource
}
