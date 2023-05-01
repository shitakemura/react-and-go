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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('email/pass', email, password)

    if (email === 'admin@example.com') {
      setJwtToken('abc')
      setAlertClassName('d-none')
      setAlertMessage('')
      navigate('/')
    } else {
      setAlertClassName('alert-danger')
      setAlertMessage('Invalid credentials')
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
