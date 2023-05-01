import { useEffect, useState } from 'react'
import { Movie } from '../models/movie'
import { useParams } from 'react-router-dom'

function Movie() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const myMovie: Movie = {
      id: 1,
      title: 'Highlander',
      release_date: '1986-03-07',
      runtime: 116,
      mpaa_rating: 'R',
      description: 'Some long description',
    }

    setMovie(myMovie)
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
      <hr />
      <p>{movie.description}</p>
    </div>
  )
}

export default Movie
