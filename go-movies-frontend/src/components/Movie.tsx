import { useEffect, useState } from 'react'
import { Movie } from '../models/movie'
import { useParams } from 'react-router-dom'

function Movie() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const getMovie = async () => {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: headers,
        }

        const response = await fetch(`/api/movies/${id}`, requestOptions)
        const data = await response.json()

        setMovie(data)
      } catch (error) {
        console.log(error)
      }
    }

    getMovie()
  }, [id])

  if (!movie) return null

  return (
    <div>
      <h2>Movie: {movie.title}</h2>
      <small>
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated{' '}
          {movie.mpaa_rating}
        </em>
      </small>
      <br />
      {movie.genres.map((g) => {
        return (
          <span key={g.genre} className='badge bg-secondary me-2'>
            {g.genre}
          </span>
        )
      })}
      <hr />
      {movie.image && (
        <div className='mb-3'>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
            alt='poster'
          />
        </div>
      )}
      <p>{movie.description}</p>
    </div>
  )
}

export default Movie
