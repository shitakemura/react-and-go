import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Movie, Genre } from '../models/movie'
import Input from './form/Input'
import Select from './form/Select'
import TextArea from './form/TestArea'
import Checkbox from './form/Checkbox'

function EditMovie() {
  const navigate = useNavigate()
  const { jwtToken } = useOutletContext<{ jwtToken: string }>()

  const [error, setError] = useState<Error | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const mpaaOptions = [
    { id: 'G', value: 'G' },
    { id: 'PG', value: 'PG' },
    { id: 'PG13', value: 'PG13' },
    { id: 'R', value: 'R' },
    { id: 'NC17', value: 'NC17' },
    { id: '18A', value: '18A' },
  ]

  const hasError = (key: string) => {
    return errors.indexOf(key) !== -1
  }

  const [movie, setMovie] = useState<Movie>({
    id: 0,
    title: '',
    image: '',
    release_date: '',
    runtime: '',
    mpaa_rating: '',
    description: '',
    genres: [],
    genres_array: [],
  })

  // get id from the URL
  const { id } = useParams()

  useEffect(() => {
    if (jwtToken == '') {
      navigate('/login')
      return
    }
  }, [jwtToken, navigate])

  useEffect(() => {
    if (id) {
      // edit an existing movie
    } else {
      // adding a movie
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const getAllGenres = async () => {
        try {
          const requestOptions: RequestInit = {
            method: 'GET',
            headers: headers,
          }

          const response = await fetch(`/api/genres`, requestOptions)
          const data = await response.json()

          setMovie((prev) => ({
            ...prev,
            genres: data,
            genres_array: [],
          }))
        } catch (error) {
          console.log(error)
        }
      }

      getAllGenres()
    }
  }, [id])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value
    const name = event.target.name
    setMovie({
      ...movie,
      [name]: value,
    })
  }

  const handleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    position: number,
  ) => {
    console.log('handleCheck called')
    console.log('value in handleCheck:', event.target.value)
    console.log('checked is', event.target.checked)
    console.log('position is', position)

    const updatedGenres = movie.genres.map((g: Genre) => {
      if (g.id === Number(event.target.value)) {
        return { ...g, checked: event.target.checked }
      } else {
        return g
      }
    })

    const updatedGenresArray = updatedGenres
      .filter((g: Genre) => g.checked)
      .map((g: Genre) => g.id)

    setMovie((prev) => ({
      ...prev,
      genres: updatedGenres,
      genres_array: updatedGenresArray,
    }))
  }

  return (
    <div>
      <h2>Add/Edit Movie</h2>
      <hr />
      <pre>{JSON.stringify(movie, null, 3)}</pre>

      <form onSubmit={handleSubmit}>
        <input type='hidden' name='id' value={movie.id} id='id' />
        <Input
          title='Title'
          className='form-control'
          type='text'
          name='title'
          value={movie.title}
          autoComplete=''
          onChange={handleChange}
          errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
          errorMsg='Please enter a title'
        />
        <Input
          title='Release Date'
          className='form-control'
          type='date'
          name='release_date'
          value={movie.release_date}
          autoComplete=''
          onChange={handleChange}
          errorDiv={hasError('release_date') ? 'text-danger' : 'd-none'}
          errorMsg='Please enter a release date'
        />
        <Input
          title='Runtime'
          className='form-control'
          type='text'
          name='runtime'
          value={movie.runtime}
          autoComplete=''
          onChange={handleChange}
          errorDiv={hasError('release_date') ? 'text-danger' : 'd-none'}
          errorMsg='Please enter a runtime'
        />

        <Select
          title='MPAA Rating'
          name='mpaa_rating'
          value={movie.mpaa_rating}
          options={mpaaOptions}
          onChange={handleChange}
          placeHolder='Choose...'
          errorDiv={hasError('mpaa_rating') ? 'test-danger' : 'd-none'}
          errorMsg='Please choose'
        />

        <TextArea
          title='Description'
          name='description'
          value={movie.description}
          rows={3}
          onChange={handleChange}
          errorDiv={hasError('description') ? 'test-danger' : 'd-none'}
          errorMsg='Please enter a description'
        />

        <hr />

        <h3>Genres</h3>

        {movie.genres && movie.genres.length > 0 && (
          <>
            {movie.genres.map((g: Genre, index: number) => (
              <Checkbox
                title={g.genre}
                name='genre'
                value={g.id}
                checked={g.checked}
                key={g.id}
                id={'genre-' + index}
                onChange={(event) => handleCheck(event, index)}
              />
            ))}
          </>
        )}
      </form>
    </div>
  )
}

export default EditMovie
