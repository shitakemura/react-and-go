import { useEffect, useState } from 'react'
import { Genre } from '../models/movie'
import { Link } from 'react-router-dom'

function Genres() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const requestOptions: RequestInit = {
          method: 'GET',
          headers: headers,
        }

        const response = await fetch(`/api/genres`, requestOptions)
        const data = await response.json()

        if (data.error) {
          setError(error)
        } else {
          setGenres(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllGenres()
  }, [error])

  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Genres</h2>
      <hr />

      <div className='list-group'>
        {genres.map((g) => (
          <Link
            key={g.id}
            className='list-group-item list-group-item-action'
            to={`/genres/${g.id}`}
            state={{
              genreName: g.genre,
            }}
          >
            {g.genre}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Genres
