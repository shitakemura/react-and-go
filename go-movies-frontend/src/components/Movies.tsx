import { useEffect, useState } from 'react'
import { Movie } from '../models/movie'
import { Link } from 'react-router-dom'

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const getAllMovies = async () => {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOptions = {
        method: 'GET',
        headers: headers,
      }

      try {
        const response = await fetch(`api/movies`, requestOptions)
        const data = await response.json()
        setMovies(data)
      } catch (err) {
        console.log(err)
      }
    }

    getAllMovies()
  }, [])

  return (
    <div>
      <h2>Movies</h2>
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
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
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

export default Movies
