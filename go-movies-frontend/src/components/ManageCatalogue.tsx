import { useEffect, useState } from 'react'
import { Movie } from '../models/movie'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

function ManageCatalogue() {
  const [movies, setMovies] = useState<Movie[]>([])
  const { jwtToken } = useOutletContext<{ jwtToken: string | null }>()
  const navigate = useNavigate()

  let didInit = false
  useEffect(() => {
    const getAllMovies = async () => {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + jwtToken)

      const requestOptions = {
        method: 'GET',
        headers: headers,
      }

      try {
        const response = await fetch(`api/admin/movies`, requestOptions)
        const data = await response.json()
        setMovies(data)
      } catch (err) {
        console.log(err)
      }
    }

    if (!jwtToken) {
      navigate('/login')
      return
    }

    if (!didInit) {
      didInit = true
      getAllMovies()
    }
  }, [jwtToken, navigate])

  return (
    <div>
      <h2>Manage Catalogue</h2>
      <hr />
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/admin/movies/${m.id}`}>{m.title}</Link>
              </td>
              <td>{m.release_date}</td>
              <td>{m.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCatalogue
