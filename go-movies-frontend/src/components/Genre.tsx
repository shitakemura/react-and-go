import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Movie } from '../models/movie'

function Genre() {
  // get the prop passed to this component
  const location = useLocation()
  const { genreName } = location.state

  const [movies, setMovies] = useState<Movie[]>([])

  // get id from url
  const { id } = useParams()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const requestOptions: RequestInit = {
          method: 'GET',
          headers: headers,
        }

        const response = await fetch(
          `/api/movies/genres/${id}`,
          requestOptions,
        )
        const data = await response.json()

        if (data.error) {
          console.log(data.error)
        } else {
          setMovies(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getMovies()
  }, [id])

  return (
    <>
      <h2>Genre: {genreName}</h2>
      <hr />

      {movies.length > 0 ? (
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
      ) : (
        <p>No movies in this genre (yet)!</p>
      )}
    </>
  )
}

export default Genre
