import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1 className='mt-3'>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          {isRouteErrorResponse(error) && (
            <p>
              <em>{error.statusText}</em>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
