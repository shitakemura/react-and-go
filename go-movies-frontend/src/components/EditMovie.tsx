import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Movie } from '../models/movie'
import Input from './form/Input'
import Select from './form/Select'
import TextArea from './form/TestArea'

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
    release_date: '',
    runtime: '',
    mpaa_rating: '',
    description: '',
  })

  // get id from the URL
  const { id } = useParams()

  useEffect(() => {
    if (jwtToken == '') {
      navigate('/login')
      return
    }
  }, [jwtToken, navigate])

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
        
      </form>
    </div>
  )
}

export default EditMovie
