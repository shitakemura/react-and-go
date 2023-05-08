import { ChangeEvent, useEffect, useState } from 'react'
import { Movie } from '../models/movie'
import Input from './form/Input'
import { Link } from 'react-router-dom'

function GraphQL() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [fullList, setFullList] = useState([])

  useEffect(() => {
    const getMoviesList = async () => {
      try {
        const payload = `
        {
          list {
            id
            title
            runtime
            release_date
            mpaa_rating
          }
        }`

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const requestOptions: RequestInit = {
          method: 'POST',
          headers: headers,
          body: payload,
        }

        const response = await fetch(`/api/graph`, requestOptions)
        const { data } = await response.json()

        setMovies(data.list)
        setFullList(data.list)
      } catch (error) {
        console.log(error)
      }
    }

    getMoviesList()
  }, [])

  const performSearch = async () => {
    try {
      const payload = `
      {
        search(titleContains: "${searchTerm}") {
          id
          title
          runtime
          release_date
          mpaa_rating
        }
      }`

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: payload,
      }

      const response = await fetch(`/api/graph`, requestOptions)
      const { data } = await response.json()

      setMovies(data.search)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const termValue = event.target.value
    setSearchTerm(termValue)

    if (termValue.length > 2) {
      performSearch()
    } else {
      setMovies(fullList)
    }
  }

  return (
    <div>
      <h2>GraphQL</h2>
      <hr />
      <form>
        <Input
          title='Search'
          type='search'
          name='search'
          className='form-control'
          autoComplete=''
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
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
                <td>{new Date(m.release_date).toLocaleDateString()}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies (yet)!</p>
      )}
    </div>
  )
}

export default GraphQL
