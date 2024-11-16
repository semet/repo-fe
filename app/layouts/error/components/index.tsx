import { isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { FC } from 'react'

type TProps = {
  title: string
}

export const ErrorWrapper: FC<TProps> = ({ title }) => {
  const error = useRouteError()
  // eslint-disable-next-line no-console
  // console.error('SHIT', error?.response)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '60%',
        margin: 'auto',
        overflowX: 'hidden'
      }}
    >
      <h1>{title}</h1>
      {isRouteErrorResponse(error) ? (
        <>
          <h2 className="text-2xl">
            {error.status} {error.statusText}
          </h2>
          <p>{error.data}</p>
        </>
      ) : error instanceof Error ? (
        <>
          <p
            style={{
              color: 'red',
              fontSize: '1.5rem'
            }}
          >
            {error.message}
          </p>
          <p>The stack trace is:</p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              padding: '1rem'
            }}
          >
            {error.stack}
          </pre>
        </>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </div>
  )
}
