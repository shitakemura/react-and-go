import { useState, FormEvent, Dispatch, SetStateAction } from 'react'
import Input from './form/Input'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setJwtToken, setAlertClassName, setAlertMessage } =
    useOutletContext<{
      setJwtToken: Dispatch<SetStateAction<string>>
      setAlertClassName: Dispatch<SetStateAction<string>>
      setAlertMessage: Dispatch<SetStateAction<string>>
    }>()

  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // build the request payload
    let payload = {
      email: email,
      password: password,
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    }

    try {
      const response = await fetch(`/api/authenticate`, requestOptions)
      const data = await response.json()

      if (data.error) {
        setAlertClassName('alert-danger')
        setAlertMessage(data.message)
      } else {
        setJwtToken(data.access_token)
        setAlertClassName('d-none')
        setAlertMessage('')
        navigate('/')
      }
    } catch (err) {
      setAlertClassName('alert-danger')
      setAlertMessage((err as Error).message)
    }
  }

  return (
    <div className='cal-md-6 offset-md-3'>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          title='Email Address'
          type='email'
          className='form-control'
          name='email'
          autoComplete='email-new'
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          title='Password'
          type='password'
          className='form-control'
          name='password'
          autoComplete='password-new'
          onChange={(event) => setPassword(event.target.value)}
        />
        <hr />
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
    </div>
  )
}

export default Login
