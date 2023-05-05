import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './components/Alert'
import { useAuth } from './hooks/useAuth'

function App() {
  const [jwtToken, setJwtToken] = useState<string | null>(null)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertClassName, setAlertClassName] = useState('d-none')

  const { accessToken, logout, refresh } = useAuth()

  const [ticking, setTicking] = useState(false)
  const [tickInterval, setTickInterval] = useState<number | undefined>(
    undefined,
  )

  const navigate = useNavigate()

  const handleLogout = () => {
    logout(() => navigate('/login'))
  }

  const pollingRefresh = useCallback(
    (status: boolean) => {
      if (status) {
        if (ticking) return
        console.log('turning on ticking!')

        const i = setInterval(() => {
          console.log('this will run every 10 minutes')
          refresh()
        }, 600000)

        setTickInterval(i)
        console.log('setting tick interval to', i)
        setTicking(true)
      } else {
        console.log('turning off ticking')
        console.log('turning off tickInterval', tickInterval)

        setTickInterval(undefined)
        clearInterval(tickInterval)
        setTicking(false)
      }
    },
    [tickInterval],
  )

  // ref: https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application
  let didInit = false

  useEffect(() => {
    if (!didInit) {
      didInit = true
      refresh()
    }
  }, [])

  useEffect(() => {
    setJwtToken(accessToken)
    pollingRefresh(accessToken !== null)
  }, [accessToken])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='mt-3'>Go Watch a Movie!</h1>
        </div>
        <div className='col text-end'>
          {jwtToken ? (
            <a href='#!' onClick={handleLogout}>
              <span className='badge bg-danger'>Logout</span>
            </a>
          ) : (
            <Link to='/login'>
              <span className='badge bg-success'>Login</span>
            </Link>
          )}
        </div>
        <hr className='md-3'></hr>
      </div>

      <div className='row'>
        <div className='col-md-2'>
          <nav>
            <div className='list-group'>
              <Link to='/' className='list-group-item list-group-item-action'>
                Home
              </Link>
              <Link
                to='/movies'
                className='list-group-item list-group-item-action'
              >
                Movies
              </Link>
              <Link
                to='/genres'
                className='list-group-item list-group-item-action'
              >
                Genres
              </Link>
              {jwtToken && (
                <>
                  <Link
                    to='/admin/movie/0'
                    className='list-group-item list-group-item-action'
                  >
                    Add Movie
                  </Link>
                  <Link
                    to='/manage-catalogue'
                    className='list-group-item list-group-item-action'
                  >
                    Manage Catalogue
                  </Link>
                  <Link
                    to='/graphql'
                    className='list-group-item list-group-item-action'
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className='col-md-10'>
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              pollingRefresh,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
