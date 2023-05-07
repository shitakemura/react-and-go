import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Movie, Genre } from '../models/movie'
import Input from './form/Input'
import Select from './form/Select'
import TextArea from './form/TestArea'
import Checkbox from './form/Checkbox'
import Swal from 'sweetalert2'

function EditMovie() {
  const navigate = useNavigate()
  const { jwtToken } = useOutletContext<{ jwtToken: string }>()

  const [error, setError] = useState<string | null>(null)
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
      const getMovieForEdit = async () => {
        try {
          const headers = new Headers()
          headers.append('Content-Type', 'application/json')
          headers.append('Authorization', 'Bearer ' + jwtToken)

          const requestOptions: RequestInit = {
            method: 'GET',
            headers: headers,
          }

          const response = await fetch(
            `/api/admin/movies/${id}`,
            requestOptions,
          )
          if (response.status !== 200) {
            setError('Invalid response code: ' + response.status)
          }
          const data = await response.json()

          const genres: Genre[] = data.genres.map((g: Genre) => {
            if (data.movie.genres_array.includes(g.id)) {
              return { ...g, checked: true }
            } else {
              return { ...g, checked: false }
            }
          })

          setMovie({
            ...data.movie,
            release_date: new Date(data.movie.release_date)
              .toISOString()
              .split('T')[0],
            genres: genres,
          })
        } catch (error) {
          console.log(error)
        }
      }

      getMovieForEdit()
    } else {
      // adding a movie
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
  }, [id, jwtToken])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const required = [
      { field: movie.title, name: 'title' },
      { field: movie.release_date, name: 'release_date' },
      { field: movie.runtime, name: 'runtime' },
      { field: movie.description, name: 'description' },
      { field: movie.mpaa_rating, name: 'mpaa_rating' },
    ]

    const errors = required
      .filter((obj) => obj.field === '')
      .map((obj) => obj.name)

    if (movie.genres_array.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'You must choose at least one genre!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      setErrors([...errors, 'genres'])
    } else {
      setErrors(errors)
    }

    if (errors.length > 0) {
      return
    }

    // passed validation, so save changes
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + jwtToken)

      // assume we are adding a new movie
      let method = 'PUT'
      if (movie.id > 0) {
        method = 'PATCH'
      }

      const requestOptions: RequestInit = {
        // we need to convert the values in JSON for release date (to date) and runtime (to int)
        body: JSON.stringify({
          ...movie,
          release_date: new Date(movie.release_date),
          runtime: Number(movie.runtime),
        }),
        method: method,
        headers: headers,
        credentials: 'include',
      }

      const response = await fetch(
        `/api/admin/movies/${id ?? 0}`,
        requestOptions,
      )
      const data = await response.json()

      if (data.error) {
        console.log(data.error)
      } else {
        navigate('/manage-catalogue')
      }
    } catch (error) {
      console.log(error)
    }
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
      {/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}
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
          errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
          errorMsg='Please enter a runtime'
        />
        <Select
          title='MPAA Rating'
          name='mpaa_rating'
          value={movie.mpaa_rating}
          options={mpaaOptions}
          onChange={handleChange}
          placeHolder='Choose...'
          errorDiv={hasError('mpaa_rating') ? 'text-danger' : 'd-none'}
          errorMsg='Please choose'
        />
        <TextArea
          title='Description'
          name='description'
          value={movie.description}
          rows={3}
          onChange={handleChange}
          errorDiv={hasError('description') ? 'text-danger' : 'd-none'}
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
        <hr />
        <button className='btn btn-primary'>Save</button>
      </form>
    </div>
  )
}

export default EditMovie
